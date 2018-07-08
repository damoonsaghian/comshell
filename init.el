(tool-bar-mode -1)
(menu-bar-mode -1)
(setq visible-bell t)
(setq inhibit-startup-screen t)
(setq make-backup-files nil)
(global-set-key (kbd "C-x k") #'kill-this-buffer)

(setq window-divider-default-places t
      window-divider-default-right-width 2
      window-divider-default-bottom-width 1)
(window-divider-mode 1)
(setq scroll-bar-adjust-thumb-portion nil)
(add-to-list 'default-frame-alist '(scroll-bar-width . 13))
(add-to-list 'default-frame-alist '(left-fringe . 2))
(add-to-list 'default-frame-alist '(right-fringe . 0))

; (setq-default mode-line-format nil)
(setq insert-default-directory nil)
(global-eldoc-mode -1)

(setq-default cursor-type 'bar)
(setq blink-cursor-blinks 0)
(set-face-attribute 'cursor nil :background "red")

(setq scroll-conservatively 200) ; never recenter point
; move point to top/bottom of buffer before signaling a scrolling error;
(setq scroll-error-top-bottom t)

(global-hl-line-mode 1)
(setq global-hl-line-sticky-flag t)
(set-face-attribute 'hl-line nil :background "lemon chiffon")
; make highlighted lines in other (not selected) windows gray;
(defun hl-line-update-face (window)
  "update the `hl-line' face in WINDOW to indicate whether the window is selected;"
  (with-current-buffer (window-buffer window)
    (when (or global-hl-line-mode hl-line-mode)
      (if (eq (current-buffer) (window-buffer (selected-window)))
          (face-remap-reset-base 'hl-line)
        (face-remap-set-base 'hl-line :background "#dddddd")))))
(add-hook 'buffer-list-update-hook
          (lambda () (walk-windows #'hl-line-update-face nil t)))

(add-to-list 'default-frame-alist '(foreground-color . "#222222"))
(set-face-attribute 'region nil :background "LightSkyBlue1")
(set-face-attribute 'default nil :height 105)
(set-face-attribute 'fixed-pitch-serif nil :font "Monospace")
(add-hook 'prog-mode-hook 'goto-address-mode)
(add-hook 'text-mode-hook 'goto-address-mode)

; paragraphs
(setq paragraph-start "\n" paragraph-separate "\n")
(defun next-paragraph ()
  (interactive)
  (unless (bobp) (left-char))
  (forward-paragraph)
  (unless (eobp) (progn (forward-paragraph)
                        (redisplay t)
                        (backward-paragraph)
                        (right-char))))
(global-set-key (kbd "C-<down>") 'next-paragraph)
(defun previous-paragraph ()
  (interactive)
  (left-char)
  (backward-paragraph)
  (unless (bobp) (progn (forward-paragraph)
                        (redisplay t)
                        (backward-paragraph)
                        (right-char))))
(global-set-key (kbd "C-<up>") 'previous-paragraph)

(setq-default indent-tabs-mode nil)

; adaptive wrap (this is taken from adaptive-wrap package);
(defun adaptive-wrap-fill-context-prefix (beg en)
  "like `fill-context-prefix', but with length 2;"
  ; note: fill-context-prefix may return nil; see: http://article.gmane.org/gmane.emacs.devel/156285
  (let* ((fcp (or (fill-context-prefix beg en) ""))
         (fcp-len (string-width fcp))
         (fill-char (if (< 0 fcp-len)
                        (string-to-char (substring fcp -1))
                      ?\ )))
    (concat fcp
            (make-string 2 fill-char))))

(defun adaptive-wrap-prefix-function (beg end)
  "indent the region between BEG and END with adaptive filling;"
  ; any change at the beginning of a line might change its wrap prefix, which affects the whole line;
  ; so we need to "round-up" `end' to the nearest end of line;
  ; we do the same with `beg' although it's probably not needed;
  (goto-char end)
  (unless (bolp) (forward-line 1))
  (setq end (point))
  (goto-char beg)
  (forward-line 0)
  (setq beg (point))
  (while (< (point) end)
    (let ((lbp (point)))
      (put-text-property (point)
                         (progn (search-forward "\n" end 'move) (point))
                         'wrap-prefix
                         (let ((pfx (adaptive-wrap-fill-context-prefix
                                     lbp (point))))
                           ; remove any `wrap-prefix' property that might have been added earlier;
                           ; otherwise, we end up with a string containing a `wrap-prefix' string, containing a `wrap-prefix' string ...
                           (remove-text-properties 0 (length pfx) '(wrap-prefix) pfx)
                           pfx))))
  `(jit-lock-bounds ,beg . ,end))

(define-minor-mode adaptive-wrap-prefix-mode
  "wrap the buffer text with adaptive filling;"
  :lighter ""
  :group 'visual-line
  (if adaptive-wrap-prefix-mode
      (progn
        ; HACK ATTACK! we want to run after font-lock (so our wrap-prefix includes the faces applied by font-lock),
        ; but  jit-lock-register doesn't accept an `append' argument,
        ; so we add ourselves beforehand, to make sure we're at the end of the hook (bug#15155);
        (add-hook 'jit-lock-functions
                  #'adaptive-wrap-prefix-function 'append t)
        (jit-lock-register #'adaptive-wrap-prefix-function))
    (jit-lock-unregister #'adaptive-wrap-prefix-function)
    (with-silent-modifications
      (save-restriction
        (widen)
        (remove-text-properties (point-min) (point-max) '(wrap-prefix nil))))))
(add-hook 'visual-line-mode-hook #'adaptive-wrap-prefix-mode)
(global-visual-line-mode +1)

; dired
(add-hook 'dired-mode-hook 'dired-hide-details-mode)
(setq dired-listing-switches "-l -I \"target\" -I \"*.lock\" -I \"#*#\"")
(setq dired-recursive-deletes 'always)
(setq dired-recursive-copies 'always)

(defun dired-open-file ()
  "open the thing under point; that can be either file or any other line of dired listing;"
  (interactive)
  (let ((file-name (dired-get-filename nil t)))
    (cond
     ((and (file-directory-p file-name) (string-match-p "/home/*/projects/*" file-name))
      ; first move all windows in the main workspace into the hidden workspace, and rename the main workspace to "project_name"; then if there is an Emacs frame named "project_name", move it to the main workspace; otherwise load the saved Emacs desktop in the hidden workspace, then move the Emacs frame named "project_name" to the main workspace;
      )
     ((and (file-directory-p file-name) (string-match-p "\\.m$" file-name))
      ; open image-dired/movie in in the right window
      )
     ((file-directory-p file-name)
      ; expand subtree
      )
     (t
      ; find file in the right window
      ))
    ))
; (eval-after-load "dired"
;   '(define-key dired-mode-map [remap dired-find-file] 'dired-open-file))

(defun go-to-link-at-point ()
  "open the file path under cursor; if the path starts with “http://”, open the URL in browser; input path can be relative, full path, URL;"
  (interactive)
  (let (($path (ffap-file-at-point)))
    (if (string-match-p "\\`https?://" $path)
        (progn
          (
           ; if the web_browser with the profile corresponding to this project is not open, open it; then if there is a web_browser window named "project-name, $path", raise it; otherwise create it;
           ))
      (if (file-exists-p $path)
          (progn
            (
             ; if there is an emacs frame named "project-name, $path", raise it; otherwise create it;
             ))
        (message "file doesn't exist: '%s';" $path)))))

(require 'package)
(defun require-package (package)
  (unless (require package nil 'noerror)
    (progn
      (unless (assoc package package-archive-contents)
	(package-refresh-contents))
      (package-install package)
      (require package))))
(defun install-package (package)
  (unless (package-installed-p package nil 'noerror)
    (progn
      (unless (assoc package package-archive-contents)
	(package-refresh-contents))
      (package-install package))))
(add-to-list 'package-archives
	     '("melpa" . "https://melpa.org/packages/") t)
;(package-initialize)
;(require-package 'package-name)
