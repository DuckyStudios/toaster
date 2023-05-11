# 🍞 Toaster

Toaster is a lightweight solution for displaying notifications on a website. It is based on Tailwind CSS and Font Awesome, making it easy to customize the appearance of the notifications. With this framework, developers can quickly and easily add notifications to their website without having to build the functionality from scratch.

## Installation
Please notice that you have to have tailwindcss installed, otherwise it wont have the wished styling effect.

```bash
npm install duckystudios/toaster
```


## How to use?
Example:
```js
new Toaster({
    type: 'info',
    title: 'Hello World!',
    message: "I'm a freshly heatened toast!",
    duration: 4500,
    button: {
        text: 'Hello!',
        onClick: function() {
            console.log('Clicked');
        }
    }
})
```


## Variables
|Variable|Optional|Examples|Description|
|--|--|--|--|
|type|❌|success, info, debug, error|Display type of the toast|
|title|❌|Hello World!|The title of the toast|
|message|❌|I'm a freshly heatened toast!|The description of the toast|
|duration|❌|4500|The stay duration in milliseconds (4500ms = 4,5s)|
|dark|✅|true, false|If the toast should be dispalyed in dark mode theme|
|button|✅|See example|Can be kept empty, so the button wont show|
