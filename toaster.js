/*!
 * Toaster.js 1.0.0
 * @license MIT licensed
 *
 * Copyright (C) 2023 DuckyStudios
 * Private Usage Only
 *
 * @author Levi Heßmann
 * @version 1.0.0
 * @link https://dcky.io
 *
 * Based on tailwindcss.com by Adam Wathan and FontAwesome by Dave Gandy
 */
let toastCount = 0;

function Toaster(options) {
    if (options === 'test') {
        options = this.randomOptions();
    }

    if (!options.message) {
        throw new Error('Toaster.js: No message provided.');
    }

    if (!options.title) {
        throw new Error('Toaster.js: No title provided.');
    }

    if (!options.dark) {
        options.dark = false;
    }

    this.options = options;
    this.options.type = this.options.type || 'info';

    this.infoSvg = '<svg class="h-5 w-5 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>';
    this.debugSvg = '<svg class="h-5 w-5 fill-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0c53 0 96 43 96 96v3.6c0 15.7-12.7 28.4-28.4 28.4H188.4c-15.7 0-28.4-12.7-28.4-28.4V96c0-53 43-96 96-96zM41.4 105.4c12.5-12.5 32.8-12.5 45.3 0l64 64c.7 .7 1.3 1.4 1.9 2.1c14.2-7.3 30.4-11.4 47.5-11.4H312c17.1 0 33.2 4.1 47.5 11.4c.6-.7 1.2-1.4 1.9-2.1l64-64c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-64 64c-.7 .7-1.4 1.3-2.1 1.9c6.2 12 10.1 25.3 11.1 39.5H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H416c0 24.6-5.5 47.8-15.4 68.6c2.2 1.3 4.2 2.9 6 4.8l64 64c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-63.1-63.1c-24.5 21.8-55.8 36.2-90.3 39.6V240c0-8.8-7.2-16-16-16s-16 7.2-16 16V479.2c-34.5-3.4-65.8-17.8-90.3-39.6L86.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l64-64c1.9-1.9 3.9-3.4 6-4.8C101.5 367.8 96 344.6 96 320H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96.3c1.1-14.1 5-27.5 11.1-39.5c-.7-.6-1.4-1.2-2.1-1.9l-64-64c-12.5-12.5-12.5-32.8 0-45.3z"/></svg>';
    this.errorSvg = '<svg class="h-5 w-5 fill-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>';
    this.successSvg = '<svg class="h-5 w-5 fill-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>';

    this._init();
}

Toaster.prototype.randomOptions = function () {
    const types = ['info', 'debug', 'error', 'success'];
    const type = types[Math.floor(Math.random() * types.length)];

    const messages = ['Hello World!', 'Sample Message', 'This is a test message.', 'This is a test message.', 'Just a test message.'];
    const message = messages[Math.floor(Math.random() * messages.length)];

    const titles = ['Howdy', 'Hello', 'Hey', 'Hi', 'Greetings'];
    const title = titles[Math.floor(Math.random() * titles.length)];

    const duration = 4500;

    return {
        type: type,
        message: message,
        title: title,
        duration: duration
    };
};

Toaster.prototype._eject = function () {
    const toast = this.toastContainerEl;
    this.options.duration = this.options.duration || 5000;

    toast.style.transition = 'all 1s ease-in-out';
    toast.style.top = `${toastCount * 85}px`;
    toastCount++;

    document.body.appendChild(toast);

    document.body.appendChild(toast);

    setTimeout(function() {
        toast.style.opacity = 0;
    }, (this.options.duration - 1000));

    setTimeout(function() {
        toast.remove();
        toastCount--;

        const toasts = document.querySelectorAll('.toast');

        toasts.forEach(function(toast, index) {
            toast.style.top = `${index * 85}px`;
        });
    }, this.options.duration);
};

Toaster.prototype._createObject = function () {
    return new Promise((resolve, reject) => {

        const container = document.createElement('div');
        container.classList.add('absolute', 'w-96', 'p-4', 'toast', 'right-0');

        const flexContainer = document.createElement('div');
        flexContainer.classList.add('shadow-md', 'flex', 'items-start', 'max-w-md', 'rounded-md', 'p-4', 'right-0', 'bg-white');

        const iconContainer = document.createElement('div');
        iconContainer.classList.add('flex-shrink-0');

        if (this.options.type === 'success') {
            iconContainer.innerHTML = this.successSvg;
        } else if (this.options.type === 'error') {
            iconContainer.innerHTML = this.errorSvg;
        } else if (this.options.type === 'info') {
            iconContainer.innerHTML = this.infoSvg;
        } else if (this.options.type === 'debug') {
            iconContainer.innerHTML = this.debugSvg;
            this.options.title = '(Debug) ' + this.options.title;
        }

        const textContainer = document.createElement('div');
        textContainer.classList.add('ml-3', 'w-0', 'flex-1', '-mt-1');

        const titleObject = document.createElement('p');
        titleObject.classList.add('text-md', 'font-medium', 'text-gray-900');

        const messageObject = document.createElement('p');
        messageObject.classList.add('text-sm', 'text-gray-500');

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('flex', 'border-l', 'border-gray-200');

        if (this.options.button) {
            const button = document.createElement('button');
            button.classList.add('flex', 'w-full', 'items-center', 'jusitfy-center', 'rounded-none', 'rounded-r-md', 'border',
                'border-transparent', 'p-2', 'px-4', 'text-sm', 'font-medium', 'text-indigo-600', 'hover:text-indigo-500', 'focus:outline-none', 'focus:ring-2', 'focus:ring-indigo-500');

            button.innerText = this.options.button.text;
            button.onclick = this.options.button.onClick;

            buttonContainer.appendChild(button);

            if (this.options.dark) {
                button.classList.remove('text-indigo-600');
                button.classList.remove('hover:text-indigo-500');

                button.classList.remove('text-indigo-200');
                button.classList.remove('hover:text-indigo-300');
            }
        }

        if (this.options.dark) {
            flexContainer.classList.remove('bg-white');
            titleObject.classList.remove('text-gray-900');
            messageObject.classList.remove('text-gray-500');
            buttonContainer.classList.remove('border-gray-200');

            flexContainer.classList.add('bg-slate-800');
            buttonContainer.classList.add('text-indigo-300');
            titleObject.classList.add('text-gray-100');
            messageObject.classList.add('text-gray-300');
            buttonContainer.classList.add('border-gray-600')
        }

        titleObject.innerText = this.options.title;
        messageObject.innerText = this.options.message;

        container.appendChild(flexContainer);

        flexContainer.appendChild(iconContainer);
        flexContainer.appendChild(textContainer);

        if (this.options.button) {
            flexContainer.appendChild(buttonContainer);
        }

        textContainer.appendChild(titleObject);
        textContainer.appendChild(messageObject);

        this.toastContainerEl = container;

        resolve();
    })
};

Toaster.prototype._init = function () {
    Promise.resolve()
        .then(() => {
            if (this.toastContainerEl) {
                return Promise.resolve();
            }

            return this._createObject();
        })
        .then(() => {
            this._eject();
        })
};