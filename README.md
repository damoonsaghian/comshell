<h1>Comshell</h1>
<h2>1, Comshell</h2>
<div><b>command based user interface</b></div>
<div>command based user interfaces (using keyboard, voice, gesture) are</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;faster, more convenient and more powerful,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;than pointer based user interfaces (using mouse, touch, pen)</div>
<div>pointer based interface seems appealing at first sight, because of its discoverability;</div>
<div>but with simple uniform GUI (ie the oposite of what we see in websites),</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;there is no need for a pointer based user interface;</div>
<div><p></p></div>
<div>touch interface has an additional problem: interaction at a distance is not possible;</div>
<div>but it can still be useful in simple or special applications;</div>
<div><p></p></div>
<div>detection of voice commands is a relatively simple process (compared to general speech recognition),</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;because we only need to match against a relatively small set of commands;</div>
<div>a headset with near range microphone can be used, to exclude far away sound sources;</div>
<div>also it is better to put battery and transmitter of the headset in a separate unit,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;that can be put in the pocket;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;this makes the headset lighter and safer;</div>
<div><p></p></div>
<div>for those who neither can use all their fingers, nor can talk,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;gesture based (2d) input can be implemented;</div>
<div><p></p></div>
<div><img src='./.data/keyboard.png' alt='keyboard.png'/></div>
<div>, two commas -&gt; ";"</div>
<div>, comma followed by a letter -&gt; the symbol on its bottom right corner</div>
<div>, ";" followed by "psi" followed by space or comma -&gt; "ψ" followed by one space or nothing</div>
<div>, "_ab_c" then two underscores -&gt; AbC (followed by one space)</div>
<div>, "__ab_c" then two underscores -&gt; __ab_c__</div>
<div><a href='https://github.com/adereth/dactyl-keyboard'>https://github.com/adereth/dactyl-keyboard</a></div>
<div>Kinesis Advantage 2 keyboard</div>
<div><a href='http://www.allthingsergo.com/the-best-ergonomic-mechanical-keyboards/'>http://www.allthingsergo.com/the-best-ergonomic-mechanical-keyboards/</a></div>
<div><p></p></div>
<div>for compatibility with other applications, we may still need a mouse,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;and these extra keys which can be put in the middle of keyboard:</div>
<div>, arrow keys, "page up", "page down", "home", "end", "tab";</div>
<div>, "alt", "ctrl", "shift", "punctuations";</div>
<div>also we can have a row of function keys, plus the "delete" key, at the top;</div>
<div><p></p></div>
<div><b>Comshell</b></div>
<div>Comshell is a unified computing environment, utilizing command based user interface;</div>
<div><p></p></div>
<div>project directories reside in directories named "projects" or "projects.*",</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;inside home directory or mounted disks;</div>
<div>list of all projects will appear in a floating layer, at the center of screen;</div>
<div>each group of projects (which are in the same directory) will be shown in separate tabs;</div>
<div><p></p></div>
<div>in a project view, list of files will be displayed in the left side_bar;</div>
<div>opened files are indicated by a line below them;</div>
<div>multiple views of a file are indicated by sections in this line;</div>
<div>files and directories with names starting with a dot, will be hidden;</div>
<div>".cache" directory inside a project is for files we don't want to share or backup;</div>
<div><p></p></div>
<div>text files will be opened in a text editor;</div>
<div>directories with ".g" suffixes, will be opened in a gallery view;</div>
<div>files and directories inside a gallery, will be opened in a floating layer;</div>
<div><p></p></div>
<div>non_local projects, web pages, PDF documents, etc,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;accessed from links inside the main project, will be opened in a floating layer;</div>
<div>web pages:</div>
<div>, move caret between visual objects (ignoring structural objects);</div>
<div>, or use hinting for text input and other widgets, text and other elements like images and videos;</div>
<div><p></p></div>
<div>modal key_bindings;</div>
<div>modes (normal mode and insert mode) must be visually distinctive;</div>
<div>press "esc" or "tab" to go to normal mode;</div>
<div>in normal mode we can:</div>
<div>, press "enter" to go to insert mode;</div>
<div>, move the cursor to the next or previous word;</div>
<div>, move the cursor to the next or previous lines or table cells;</div>
<div>, move the cursor to the next or previous paragraph;</div>
<div>, start and end selection, then copy or cut;</div>
<div>, paste</div>
<div>, undo</div>
<div>, find</div>
<div><p></p></div>
<div>, navigation: move, search</div>
<div>, selection</div>
<div>, completion</div>
<div><p></p></div>
<div>double space:</div>
<div>, at the beginning of line: indent</div>
<div>, otherwise: complete (auto_completion does not disappear with only one space)</div>
<h2>2, computers</h2>
<div><b>asynchronous digital circuits</b></div>
<div>in conventional digital circuits when the inputs change,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;the outputs can have temporary invalid values, until they stabilize to the valid values;</div>
<div>but for the circuit to do its job,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;gates with memory (registers) must operate only when the inputs have correct values;</div>
<div>one solution is to synchronize registers with a global clock signal;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;the period of clock signal is made long enough for the circuit to become stable;</div>
<div><p></p></div>
<div>disadvantages of synchronous circuits:</div>
<div>, we have to split long operations into several smaller ones,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;which can be performed in successive clock cycles (a technique known as pipelining);</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;otherwise the circuit would be slow and inefficient;</div>
<div>, distributing a high_fan_out, timing_sensitive clock signal can be complicated;</div>
<div>, electromagnetic interference at the clock frequency and its harmonics;</div>
<div>, widely distributed clock signal takes a lot of power,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;and must run whether the circuit is receiving inputs or not;</div>
<div>although "clock gating" can help to reduce some of the problems of synchronous circuits,</div>
<div> i think the real solution is to use asynchronous circuits;</div>
<div><p></p></div>
<div>the only sane kind of asynchronous circuit which i could imagine is this:</div>
<div>, next to any data wire there is a control wire which determines if the data is valid or not;</div>
<div>, when a register wants to change its outputs, it first invalidates them,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;for a duration equal to the delay of one gate;</div>
<div>, any gate receiving an invalid input, invalidates its outputs;</div>
<div>, this way all data which is going to change in the future, is first invalidated;</div>
<div>, registers operate only when all inputs are valid;</div>
<div><p></p></div>
<div><b>computers</b></div>
<div>cpu, memory, peripherals,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;this seems to be the only practical architecture for the hardware of computers;</div>
<div>cpu runs a sequence of simple computations, called instruction codes, one by one;</div>
<div><p></p></div>
<div>compilers are special programs that generate instruction codes,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;from a program written in a structured and human readable language;</div>
<div><p></p></div>
<div>there is always possibility of backdoors for closed source CPU,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;especially if the boot firmware is also closed source;</div>
<div>recently introduction of "secure execution environment" makes this situation even worse;</div>
<div>it's a closed source, full_blown, always_running mini operating system,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;with full access to the whole system (including memory and network);</div>
<div>furthermore they have made it practically impossible for users to disable it;</div>
<div>this mess of a design cries out for hidden and quite sophisticated backdoors;</div>
<div><a href='https://www.fsf.org/blogs/licensing/intel-me-and-why-we-should-get-rid-of-me'>https://www.fsf.org/blogs/licensing/intel-me-and-why-we-should-get-rid-of-me</a></div>
<div><a href='https://libreboot.org/faq.html#intel'>https://libreboot.org/faq.html#intel</a></div>
<div><a href='https://en.wikipedia.org/wiki/Intel_Management_Engine'>https://en.wikipedia.org/wiki/Intel_Management_Engine</a></div>
<div><a href='https://blog.invisiblethings.org/papers/2015/x86_harmful.pdf'>https://blog.invisiblethings.org/papers/2015/x86_harmful.pdf</a></div>
<div><p></p></div>
<div>one read_only ROM, plus a writable ROM:</div>
<div>, no possibility of bricking the device;</div>
<div>, no need for complex signing mechanism to make sure a device's firmware is not malicious;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;just clear the writable flash when you buy a device;</div>
<div><p></p></div>
<div>on X86 architecture we can have open source boot_loader, and GPU drivers,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;using Intel with Coreboot+Grub2 for example;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://www.coreboot.org/GRUB2#Scanning_for_grub.cfg_on_local_hard_drives'>https://www.coreboot.org/GRUB2#Scanning_for_grub.cfg_on_local_hard_drives</a></div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;though there sill will be closed source parts (Intel FSP);</div>
<div>but there is no easy way to get rid of Intel ME (or AMD PSP);</div>
<div>though there are some hacks for disabling (but not completely remove) Intel ME:</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://puri.sm/posts/deep-dive-into-intel-me-disablement/'>https://puri.sm/posts/deep-dive-into-intel-me-disablement/</a></div>
<div><p></p></div>
<div>ARM architecture is closed source too, but we can have open source GPU driver (Qualcomm/Adreno),</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;and Coreboot+Grub2 bootloader;</div>
<div>ARM TrustZone can host an open source operating system too, apparently;</div>
<div><a href='https://news.ycombinator.com/item?id=17783357'>https://news.ycombinator.com/item?id=17783357</a></div>
<div><p></p></div>
<div>open source CPU:</div>
<div>, RISC_V: no adequate hardware available yet;</div>
<div>, PowerPc: no adequate hardware available yet;</div>
<div>, MIPS: bad old design (relative to other alternatives, not X86),</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;no suitable hardware available yet;</div>
<div><p></p></div>
<div>programs usually do not run directly on computer hardware;</div>
<div>instead they run on a more sophisticated software machine (a virtual machine) called the kernel;</div>
<div>in theory we can live without a kernel (an idea sometimes called a library operating system);</div>
<div>but in that case, we have to rewrite all the required libraries, on bare metal;</div>
<div>anyway, having an operating system, makes developing and testing new programs much easier;</div>
<div><p></p></div>
<div>Linux is a highly developed, constantly evolving, open_source kernel;</div>
<div>in Linux (and other Unix based operating systems) most things appear in the file system;</div>
<div>i think the reason is to make it possible to do lots of things using shell scripts,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;instead of a proper programming language;</div>
<div>while i can understand the convenience it provides, i don't think it's good design;</div>
<h2>3, ArchLinux</h2>
<div>using Arch Linux we can easily setup and maintain a Linux system;</div>
<div>the following shows how to setup a basic graphical environment, using GnomeShell;</div>
<div><img src='./.data/gnome-shell.png' alt='gnome-shell.png'/></div>
<div><p></p></div>
<div>in the installed system, there is only one application, a terminal emulator;</div>
<div>other applications can be installed using "pacman";</div>
<div>you can press "alt-space" to show the list of applications;</div>
<div>selecting an application from the list shows it in a dedicated workspace;</div>
<div>also you can power off, reboot, logout, suspend, or lock the system,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;from the applications list, just by typing those commands;</div>
<div>press "alt-enter" to open a terminal window;</div>
<div>press "alt-esc" to close the focused window;</div>
<div>press "alt-tab" to switch between recent workspaces;</div>
<div>press "alt-a" to switch between the windows of a workspace;</div>
<div>press "alt-shift-space" to toggle maximized state;</div>
<div>press "alt-shift-s" or "alt-shift-r" to take a screen_shot or record a screen_cast;</div>
<div><p></p></div>
<div>boot Arch Linux live environment;</div>
<div>to ensure the system clock is accurate:</div>
<div>; timedatectl set-ntp true</div>
<div>if you need to connect to a WIFI network:</div>
<div>; iwctl</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;device list</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;station &lt;device&gt; get-networks</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;station &lt;device&gt; connect &lt;SSID&gt;</div>
<div><p></p></div>
<div>list available block devices using "lsblk", then on the intended block device,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;create the needed partitions, and finally format and mount them:</div>
<div>; printf "label: gpt\n,260MiB,U,*\n;" | sfdisk /dev/&lt;device&gt;</div>
<div>; mkfs.fat -F32 /dev/&lt;partition1&gt;; mkfs.btrfs /dev/&lt;partition2&gt;</div>
<div>; mount /dev/&lt;partition2&gt; /mnt</div>
<div>; mkdir -p /mnt/boot/efi</div>
<div>; mount /dev/&lt;partition1&gt; /mnt/boot/efi</div>
<div>; mkdir /mnt/etc</div>
<div>; genfstab -U /mnt &gt;&gt; /mnt/etc/fstab</div>
<div><p></p></div>
<div>;sh</div>
<div>pacstrap /mnt base</div>
<div>arch-chroot /mnt</div>
<div>curl https://damoonsaghian/Comshell/archive/master.tar.gz | tar -xz</div>
<div>cd Comshell/ArchLinux</div>
<div>;</div>
<div>ensure that the files aren't malicious, then:</div>
<div>; sh install.sh</div>
<div>; exit; reboot</div>
<div><p></p></div>
<div>to connect to a WIFI network:</div>
<div>; nmcli dev wifi</div>
<div>; nmcli --ask dev wifi con &lt;ssid&gt;</div>
<div>to disconnect from a WIFI network:</div>
<div>; nmcli con down id &lt;ssid&gt;</div>
<div><p></p></div>
<div>if your combined headset jack is not detected correctly, you can try this:</div>
<div>; pkexec echo 'options snd_hda_intel index=0 model=dell-headset-multi' &gt; /etc/modprobe.d/alsa-base.conf</div>
<div><a href='https://wiki.archlinux.org/index.php/Advanced_Linux_Sound_Architecture#Correctly_detect_microphone_plugged_in_a_4-pin_3.5mm_(TRRS)_jack'>https://wiki.archlinux.org/index.php/Advanced_Linux_Sound_Architecture#Correctly_detect_microphone_plugged_in_a_4-pin_3.5mm_(TRRS)_jack</a></div>
<div>this made the microphone available, but with a very bad static noise;</div>
<div>so maybe it's better to use a USB/Bluetooth sound card;</div>
<div><p></p></div>
<div>you can set "user1" for automatic login (using the root terminal):</div>
<div>; pkexec nano /etc/gdm/custom.conf</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;[daemon]</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;AutomaticLoginEnable=True</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;AutomaticLogin=user1</div>
<div>but to protect the computer from physical attacks, you have to disable automatic login,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;and lock the session when you leave the computer;</div>
<div>in addition you have to:</div>
<div>, somehow prevent tampering with hardware;</div>
<div>, disable boot from USB (and other external ports);</div>
<div>, protect boot firmware by a password;</div>
<div>these can make physical attacks more difficult, but keep in mind that</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;physical access to a computer is root access, given enough time and resources;</div>
<div><p></p></div>
<div><b>system administration</b></div>
<div>in system administration we must ensure that:</div>
<div>1, the command executed is explicitly given by the user;</div>
<div>2, if a program steals a "wheel" user's password, it can't change the system;</div>
<div><p></p></div>
<div>"sudo" fails in both cases;</div>
<div><a href='https://www.reddit.com/r/linuxquestions/comments/8mlil7/whats_the_point_of_the_sudo_password_prompt_if/'>https://www.reddit.com/r/linuxquestions/comments/8mlil7/whats_the_point_of_the_sudo_password_prompt_if/</a></div>
<div><p></p></div>
<div>"pkexec" is safer, but since the Polkit agent doesn't show command arguments,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;it can be vulnerable too;</div>
<div>further more, "pkexec" fails in the second case;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;a fake Polkit agent can be used to send the stolen password to Polkit;</div>
<div>and since Polkit admin is installed and active by default,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;we have to disable it to protect the system:</div>
<div>; mkdir -p /etc/polkit-1/rules.d</div>
<div>; echo 'polkit.addAdminRule(function(action, subject) { return []; });' &gt;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;/etc/polkit-1/rules.d/49-rootpw_global.rules</div>
<div><p></p></div>
<div>always use a different password for root; because "su" is always present in a Linux system,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;and since it fails in both cases, it can be used to take over the system;</div>
<div><p></p></div>
<div>the solution is a program which opens a Wayland window with a command prompt;</div>
<div>if you have given your command as arguments to the program,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;the prompt shows that command, as default input;</div>
<div>after pressing "return", it asks for the user's password (user must be in wheel group);</div>
<div><p></p></div>
<div><b>automatic online atomic upgrades</b></div>
<div><a href='https://www.techrapid.uk/2017/04/automatically-update-arch-linux-with-systemd.html'>https://www.techrapid.uk/2017/04/automatically-update-arch-linux-with-systemd.html</a></div>
<div><a href='https://wiki.archlinux.org/index.php/Systemd/Timers'>https://wiki.archlinux.org/index.php/Systemd/Timers</a></div>
<div><p></p></div>
<div>to have reliable automatic updates, they must be atomic;</div>
<div><p></p></div>
<div>"usr", "etc" and "boot" must be symlinks to subvolumes;</div>
<div>create a base directory;</div>
<div>create snapshots of "usr", "etc" and "boot", then mount them in the base directory;</div>
<div>for the rest of system root directories make symlinks in the base directory;</div>
<div>chroot and upgrade;</div>
<div>remove the base directory;</div>
<div>change the "usr", "etc" and "boot" symlinks in the system root,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;to point to the new snapshots;</div>
<h2>4, Rust</h2>
<div>Rust makes bad programming hard, and good programming fun;</div>
<div>Rust does not hide inherent complexity, in fact it bolds it, so we can see it, and avoid it;</div>
<div>by inherent complexity i mean a complexity which can not be abstracted away completely;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;ie if we try to hide it, it will re_emerge somewhere else;</div>
<div>in fact, hiding inherent complexity usually leads to choosing the wrong approach;</div>
<div><p></p></div>
<div>sharing mutable data,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;ie having a mutable reference to some data, while it is shared using other references,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;is the root of many inherent complexities;</div>
<div><a href='https://manishearth.github.io/blog/2015/05/17/the-problem-with-shared-mutability/'>https://manishearth.github.io/blog/2015/05/17/the-problem-with-shared-mutability/</a></div>
<div>the basic problem in concurrent programming is sharing mutable data;</div>
<div><p></p></div>
<div>a data race happens when these three behaviors occur:</div>
<div>, two or more pointers access the same data at the same time;</div>
<div>, at least one of the pointers is being used to write to the data;</div>
<div>, there’s no mechanism being used to synchronize access to the data;</div>
<div><p></p></div>
<div>to prevent sharing mutable data, we can abandon mutability like in Haskell;</div>
<div>but since mutability is necessary any way, it introduces a complicated mechanism (Monads);</div>
<div><p></p></div>
<div>another approach to deal with concurrently shared mutable data, is the one used in Pony;</div>
<div><a href='https://www.ponylang.io/'>https://www.ponylang.io/</a></div>
<div>it doesn't abandon aliasing nor mutability,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;instead it controls them using reference capabilities;</div>
<div>Pony's approach introduces many complexities, especially when dealing with generics;</div>
<div><p></p></div>
<div>a better approach is done by Rust, a language which overall has a better design too;</div>
<div>this approach even allows Rust to limit reference counting,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;to situations where it's absolutely necessary;</div>
<div>Pony_like actors can be done in Rust using "may_actor";</div>
<div><a href='https://crates.io/crates/may_actor'>https://crates.io/crates/may_actor</a></div>
<div><p></p></div>
<div>, immutable data will be wrapped in "Arc", and we have direct access to it;</div>
<div>, mutable data will be wrapped in "Actor" and we can access it only through the actor itself;</div>
<div><p></p></div>
<div>async access: Rc</div>
<div>async access from multiple threads: Arc</div>
<div>async mutable access: Rc&lt;RefCell&gt;</div>
<div>async mutable access from mutiple threads: Actor</div>
<div><p></p></div>
<div>it's better to use "&mut" only for the receiver in methods;</div>
<div>and anywhere else use actors to control mutability;</div>
<div><p></p></div>
<div>static data (functions, structs, constants): no problem, copy or share by reference;</div>
<div>dynamic data:</div>
<div>, if data is small we usually put it on stack;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;so we don't share it across the program, we copy it;</div>
<div>, if data is big we put it on heap and make references to it;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;if data is immutable we just have to manage its lifetime,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;either statically (using "&"), or dynamically (using "Arc")</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;but if data is mutable we have to check if the read_write_lock pattern is fulfilled,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;using "&mut" or "Actor";</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;"Mutex" or "RwLock" check read_write_lock pattern at runtime,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and make the program to panic, if it's failed;</div>
<div><p></p></div>
<div>in Rust any resource have exactly one owner which takes care of its resource deallocation;</div>
<div>owners can share their data by lending them to references;</div>
<div>references must have a lifetime less than the owner;</div>
<div>furthermore lifetime of a mutable reference must not overlap with other references;</div>
<div><a href='http://blog.skylight.io/rust-means-never-having-to-close-a-socket/'>http://blog.skylight.io/rust-means-never-having-to-close-a-socket/</a></div>
<div><p></p></div>
<div>owner can:</div>
<div>, access and mutate the resource;</div>
<div>, lend the resource to a reference;</div>
<div>, hand over ownership (move), or deallocate resource;</div>
<div>but during a lend, owner can't:</div>
<div>, mutate the resource;</div>
<div>, mutably lend resource to another reference;</div>
<div>, hand over ownership (move), or deallocate resource;</div>
<div>and during a mutable lend, owner can't even access the resource;</div>
<div><p></p></div>
<div>immutable (and thus sharable) references can:</div>
<div>, access borrowed resource;</div>
<div>, immutably lend resource to other references;</div>
<div>mutable (and thus exclusive) reference can:</div>
<div>, access and mutate resource;</div>
<div>, mutably lend resource to another reference;</div>
<div>, immutably lend resource, but during this lending, they can't mutate it;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;just like when an owner immutably lends its resource;</div>
<div><p></p></div>
<div>during shared borrow (immutable borrow) no one owns the data;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;so even the original owner can't change it;</div>
<div>during mutable borrow the (unique) borrower owns it;</div>
<div>so "&mut" is actually a temporary transfer of ownership;</div>
<div><p></p></div>
<div>s: String -&gt; &s: &String -&gt; &s[..]: &str</div>
<div>v: Vec&lt;T&gt; -&gt; &v: &Vec&lt;T&gt; -&gt; &v[..]: &[T]</div>
<div>&str and &[T] are slices; str and [T] are unsized types;</div>
<div>slicing is like borrowing from an unsized type;</div>
<div>since the slice contains the size, the lending type itself doesn't need to have a definite size;</div>
<div><p></p></div>
<div>x = a[i] -&gt; this is possible if the elements of "a" are copy</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;(cause moving out of collections is not possible);</div>
<div>x = &a[i] -&gt; this is for the case when the elements are not copy;</div>
<div>x = a[i..j] -&gt; this is always invalid;</div>
<div>x = &a[i..j] -&gt; slicing;</div>
<div><p></p></div>
<div>auto ref/deref for self in method calls:</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;compiler inserts as many * or & as necessary to get it right;</div>
<div>because in method calls name and context of a method call is almost always sufficient</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;to infer the move/borrow semantics;</div>
<div><p></p></div>
<div>deref coercion:</div>
<div>, &T -&gt; &U when T: Deref&lt;Target=U&gt;</div>
<div>, &mut T -&gt; &U when T: Deref&lt;Target=U&gt;</div>
<div>, &mut T -&gt; &mut U when T: DerefMut&lt;Target=U&gt;</div>
<div>examples:</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&&i32 -&gt; &i32 because &i32: Deref&lt;Target=i32&gt;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&String -&gt; &str because String: Deref&lt;Target=str&gt;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&Vec&lt;T&gt; -&gt; &[T] because Vec&lt;T&gt;: Deref&lt;Target=[T]&gt;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&Arc&lt;T&gt; -&gt; &T because Arc&lt;T&gt;: Deref&lt;Target=T&gt;</div>
<div><a href='https://github.com/rust-lang/rfcs/blob/master/text/0241-deref-conversions.md'>https://github.com/rust-lang/rfcs/blob/master/text/0241-deref-conversions.md</a></div>
<div><p></p></div>
<div><b>type system</b></div>
<div>types show us what we can do with the data, ie which operations are valid;</div>
<div><p></p></div>
<div>the class hierarchy design, like the one in Java, is problematic;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;<a href='http://ptgmedia.pearsoncmg.com/images/020163371x/items/item33.html'>http://ptgmedia.pearsoncmg.com/images/020163371x/items/item33.html</a></div>
<div>also the problem of covariance for generic types, has its root in this problem;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://en.wikipedia.org/wiki/Wildcard_(Java)'>https://en.wikipedia.org/wiki/Wildcard_(Java)</a></div>
<div>i think this problem is also the motivation for dynamic typing (another bad design);</div>
<div>the right way as done in Pony and Rust:</div>
<div>, concrete types (like final classes in Java) can be instantiated, but cannot have subtypes;</div>
<div>, abstract types (like abstract classes in Java) cannot be instantiated, but can have subtypes;</div>
<div><p></p></div>
<div>note that "x.m()" is method call syntax, which completely differs from "(x.m)()";</div>
<div><p></p></div>
<div>an absolute path starts from a crate root by using a crate name or a literal "crate";</div>
<div>a relative path starts from the current module and uses</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;"self", "super", or the name of an item in the current module;</div>
<div>if an in_scope item has the same name as a crate, then we have to resolve the ambiguity:</div>
<div>, using a leading "::" for a crate name;</div>
<div>, using a leading "self::" for an in_scope item;</div>
<div><p></p></div>
<div>arrays like tuples have fixed size and thus stored on stack;</div>
<div>but since they are homogeneous (all elements are of the same type),</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;they can be indexed at runtime;</div>
<div>vectors and hash tables are homogeneous, varying sized collections;</div>
<div><p></p></div>
<div>Rust does not have named arguments and named tuples; and it's a good thing;</div>
<div>when you need functions with lots of arguments, or tuples with lots of elements,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;it's a sign that you need to restructure your code, and use structs to define new types;</div>
<div><p></p></div>
<div>a closure is like an anonymous struct made of variables captured from environment,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;that is callable (implements Fn/FnMut/FnOnce trait);</div>
<div>so all closures are unique types, but they have traits in common;</div>
<div>note that if we put a generic type parameter in the return type of a function,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;we have to provide the concrete type when we call the function;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;thus we can't use generic type parameters to return a closure, we have to use "impl";</div>
<div><p></p></div>
<div>"fn(T1) -&gt; T2" is not an unsized type like "str", it's a function pointer;</div>
<div><p></p></div>
<div><a href='https://crates.io/crates/serde'>https://crates.io/crates/serde</a></div>
<div><a href='https://github.com/ron-rs/ron'>https://github.com/ron-rs/ron</a></div>
<div><p></p></div>
<div>math:</div>
<div><a href='https://nalgebra.org/rustdoc/nalgebra/index.html'>https://nalgebra.org/rustdoc/nalgebra/index.html</a></div>
<div><a href='https://gitlab.com/ornamentist/un-algebra'>https://gitlab.com/ornamentist/un-algebra</a></div>
<div><a href='https://github.com/rustsim/alga'>https://github.com/rustsim/alga</a></div>
<div><p></p></div>
<div>machine learning:</div>
<div>methods that their operation depends on adjustable fields;</div>
<div><p></p></div>
<div>install "rustup" and "gcc" then:</div>
<div>; rustup default stable</div>
<div>to update Rust:</div>
<div>; rustup update</div>
<h2>5, Git</h2>
<div>the problem of shared mutable data is so pervasive in the computing world;</div>
<div>we can also see it in file synchronization tools like Git:</div>
<div>, there can be conflicts when pushing or pulling, that must be resolved manually;</div>
<div>, the history just grows indefinitely cause change in the history of the repository can be catastrophic;</div>
<div><p></p></div>
<div>solution:</div>
<div>only the owner can mutate the repository;</div>
<div>owner can mutably borrow the repository for a defined duration, or move ownership;</div>
<div>others have to send messages:</div>
<div>, in the form of to_dos define by the owner;</div>
<div>, corrections</div>
<div><p></p></div>
<div>immutable repositories can apply corrections and to_dos, and test them,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;but they can't push it to remote, only the owner can;</div>
<div>automatic sync at the immutable ends;</div>
<div>sync before sending to_dos or corrections;</div>
<div><p></p></div>
<div><a href='https://git-scm.com/docs/git-config#Documentation/git-config.txt-httpcookieFile'>https://git-scm.com/docs/git-config#Documentation/git-config.txt-httpcookieFile</a></div>
<div>gitless</div>
<div><a href='https://people.gnome.org/~newren/eg/'>https://people.gnome.org/~newren/eg/</a></div>
<div><p></p></div>
<div>delete old and big history;</div>
<div>for text files at least keep the last version (for diffing);</div>
<div>for binaries delete all;</div>
<div>clone only the last version;</div>
<div>git shallow clones</div>
<div>git partial clones</div>
<div><p></p></div>
<div>Gitlab:</div>
<div><a href='https://gist.github.com/gpocentek/bd4c3fbf8a6ce226ebddc4aad6b46c0a'>https://gist.github.com/gpocentek/bd4c3fbf8a6ce226ebddc4aad6b46c0a</a></div>
<div>".gitignore" and ".gitlab-ci.yml"</div>
<div>create readme with CI;</div>
<div><a href='https://stackoverflow.com/questions/38807677/use-gitlab-api-from-a-gitlabci-build-script"'>https://stackoverflow.com/questions/38807677/use-gitlab-api-from-a-gitlabci-build-script"</a></div>
<div><a href='https://www.reddit.com/r/devops/comments/adhg4x/how_are_gitlab_ci_environment_variables_are/'>https://www.reddit.com/r/devops/comments/adhg4x/how_are_gitlab_ci_environment_variables_are/</a></div>
<div><a href='https://gitlab.com/gitlab-org/gitlab/-/issues/20416'>https://gitlab.com/gitlab-org/gitlab/-/issues/20416</a></div>
<div><a href='https://docs.gitlab.com/ee/ci/quick_start/'>https://docs.gitlab.com/ee/ci/quick_start/</a></div>
<div><a href='https://docs.gitlab.com/ee/user/project/push_options.html#push-options-for-gitlab-cicd'>https://docs.gitlab.com/ee/user/project/push_options.html#push-options-for-gitlab-cicd</a></div>
<div><a href='https://docs.gitlab.com/ee/ci/variables/README.html'>https://docs.gitlab.com/ee/ci/variables/README.html</a></div>
<div>personal access token put in a masked variable;</div>
<div><a href='https://fromthebottomoftheheap.net/2020/04/30/rendering-your-readme-with-github-actions/'>https://fromthebottomoftheheap.net/2020/04/30/rendering-your-readme-with-github-actions/</a></div>
<div><a href='https://github.com/marketplace/actions/generate-update-markdown-content'>https://github.com/marketplace/actions/generate-update-markdown-content</a></div>
<div><a href='https://github.com/theboi/github-update-readme'>https://github.com/theboi/github-update-readme</a></div>
<div>push_to_create creates private repositories, and there is no push_options to make them public, yet;</div>
<div>also we can't remove repositories;</div>
<div>so we must use push options for gitlab ci/cd;</div>
<div><p></p></div>
<div><a href='https://about.gitlab.com/blog/2016/12/07/building-a-new-gitlab-docs-site-with-nanoc-gitlab-ci-and-gitlab-pages/'>https://about.gitlab.com/blog/2016/12/07/building-a-new-gitlab-docs-site-with-nanoc-gitlab-ci-and-gitlab-pages/</a></div>
<h2>6, graphics</h2>
<div>software rendering gives us a lot more flexibility,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;because we won't be limited by a hardware implementation,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;with triangle only rasterization, isolated shader programs, and fixed size buffers;</div>
<div>GPU equivalent performance can be achieved using SIMD;</div>
<div><p></p></div>
<div>graphical objects are made of primitives;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;each primitive has a specific algorithm for rasterization;</div>
<div>2d primitives: point, line, curve, triangle, curved area;</div>
<div>3d objects made of flat surfaces will be broken up into triangles;</div>
<div>3d objects made of curved surfaces can be broken up into a number of primitive 3d surfaces,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;which can be easily projected to 2d;</div>
<div><a href='https://en.wikipedia.org/wiki/Quadric'>https://en.wikipedia.org/wiki/Quadric</a></div>
<div>also interpolation is a good method for amorphous surfaces;</div>
<div><p></p></div>
<div>2d objects will be rasterized into pixels (a pixel is a coordinate plus a color value);</div>
<div>then these rasterized objects will be drawn in the framebuffer,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;in layers over each other (in an overlay on top of all 3d objects);</div>
<div>rasterizing 3d objects, produces an array of fragments;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;a fragment, besides color, contains a normal and a depth;</div>
<div>when creating the pixels of the framebuffer from the fragments,</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;the normals are used for lighting, and the depths are used for z_buffer;</div>
<div><p></p></div>
<div>graphical objects are of 2 kinds:</div>
<div>, those which we know will remain unchanged the next time we want to draw to the framebuffer;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;these objects are first rasterized into memory, then we copy it into framebuffer;</div>
<div>, those which we know will be changed (scaled, rotated, moved in z direction)</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;the next time we want to draw to the framebuffer</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(which happens a lot for animations with high frame rate);</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;these objects will be drawn directly to the framebuffer;</div>
<div>(framebuffer uses double buffering and v_sync;)</div>
<div>note that if an object just moves in x_y plane (without rotation),</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;the cached rasterization is still useful;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;for 2d objects we simply add a constant to the position of all pixels;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;for 3d objects we may additionally want to recompute the lighting of pixels from fragments;</div>
<div><p></p></div>
<div>data structure for graphical objects:</div>
<div>, primitives</div>
<div>, material</div>
<div>, cached rasterization (can be none)</div>
<div><p></p></div>
<div>with a scene graph we can have fine grained graphical objects which can be combined easily;</div>
<div><p></p></div>
<div><a href='https://en.wikipedia.org/wiki/Midpoint_circle_algorithm'>https://en.wikipedia.org/wiki/Midpoint_circle_algorithm</a></div>
<div><a href='https://en.wikipedia.org/wiki/Xiaolin_Wu%27s_line_algorithm'>https://en.wikipedia.org/wiki/Xiaolin_Wu%27s_line_algorithm</a></div>
<div><a href='http://members.chello.at/~easyfilter/bresenham.html'>http://members.chello.at/~easyfilter/bresenham.html</a></div>
<div><a href='https://nothings.org/gamedev/rasterize/'>https://nothings.org/gamedev/rasterize/</a></div>
<div><a href='https://magcius.github.io/xplain/article/'>https://magcius.github.io/xplain/article/</a></div>
<div><a href='https://en.wikipedia.org/wiki/Stencil_buffer'>https://en.wikipedia.org/wiki/Stencil_buffer</a></div>
<div><a href='https://www.scratchapixel.com'>https://www.scratchapixel.com</a></div>
<div><a href='https://www.scratchapixel.com/lessons/3d-basic-rendering/phong-shader-BRDF'>https://www.scratchapixel.com/lessons/3d-basic-rendering/phong-shader-BRDF</a></div>
<div><p></p></div>
<div><a href='https://github.com/rust-windowing/winit'>https://github.com/rust-windowing/winit</a></div>
<div><a href='https://github.com/kas-gui/kas'>https://github.com/kas-gui/kas</a></div>
<div><a href='https://github.com/sebcrozet/kiss3d'>https://github.com/sebcrozet/kiss3d</a></div>
<div><a href='https://github.com/three-rs/three'>https://github.com/three-rs/three</a></div>
<div><a href='https://crates.io/crates/rust-3d'>https://crates.io/crates/rust-3d</a></div>
<div><a href='https://github.com/38/plotters'>https://github.com/38/plotters</a></div>
<div><a href='https://github.com/rustsim/nphysics'>https://github.com/rustsim/nphysics</a></div>
<div><p></p></div>
<div>mono_space fonts:</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;wide characters are forced to squeeze;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;narrow characters are forced to stretch;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;uppercase letters look skinny next to lowercase;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;bold characters don’t have enough room;</div>
<div>proportional font for code:</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;generous spacing</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;large punctuation</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;and easily distinguishable characters</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;while allowing each character to take up the space that it needs</div>
<div><a href='http://input.fontbureau.com/info/'>http://input.fontbureau.com/info/</a></div>
<div>for proportional fonts, we can't use spaces for text alignment;</div>
<div>elastic tabstops may help: <a href='http://nickgravgaard.com/elastic-tabstops/'>http://nickgravgaard.com/elastic-tabstops/</a>;</div>
<div>but i think, text alignment is a bad idea, in general;</div>
<h2>7, GUI</h2>
<div>implementing a complete GUI toolkit is a lot of work;</div>
<div>existing ones (like GTK) are single threaded;</div>
<div>thus we can't access GTK widgets (and data structures containing them), from inside actors;</div>
<div>solution:</div>
<div><a href='https://gtk-rs.org/docs/glib/source/fn.idle_add.html'>https://gtk-rs.org/docs/glib/source/fn.idle_add.html</a></div>
<div><a href='https://docs.rs/fragile/1.0.0/fragile/struct.Fragile.html'>https://docs.rs/fragile/1.0.0/fragile/struct.Fragile.html</a></div>
<div><a href='https://docs.rs/send_wrapper/0.4.0/send_wrapper/'>https://docs.rs/send_wrapper/0.4.0/send_wrapper/</a></div>
<div>we deal with Gobjects by wrapping them in a Gsend;</div>
<div>Gsend embeds a Fragile which will be created in the GTK main thread (using "idle_add"),</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;and then received (and put inside the Gsend) using a channel;</div>
<div>Gsend.new gets a closure (instead of a Gobject value);</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;the closure's return type is the type of the specific Gobject;</div>
<div><p></p></div>
<div><a href='https://gtk-rs.org/docs/gtk/'>https://gtk-rs.org/docs/gtk/</a></div>
<div><a href='https://mmstick.github.io/gtkrs-tutorials/introduction.html'>https://mmstick.github.io/gtkrs-tutorials/introduction.html</a></div>
<div><a href='https://github.com/gtk-rs/examples/tree/master/src/bin'>https://github.com/gtk-rs/examples/tree/master/src/bin</a></div>
<div><p></p></div>
<div>gtksourceview4 webkit2gtk</div>
<div>poppler-glib goffice goocanvas</div>
<div><p></p></div>
<div><a href='https://pijul.org/'>https://pijul.org/</a></div>
<div><p></p></div>
<div><a href='https://arcolinuxiso.com/how-to-create-your-own-online-arch-linux-repository-on-github-and-use-it-on-any-arcolinux/'>https://arcolinuxiso.com/how-to-create-your-own-online-arch-linux-repository-on-github-and-use-it-on-any-arcolinux/</a></div>
<div><a href='https://wiki.archlinux.org/index.php/unofficial_user_repositories'>https://wiki.archlinux.org/index.php/unofficial_user_repositories</a></div></pre>