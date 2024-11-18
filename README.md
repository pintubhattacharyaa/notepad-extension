<<<<<<< HEAD
# Chrome Quick Notes Extension

A Chrome extension for taking and managing notes directly in your browser.

## Features

- Create and manage multiple notes
- Search through your notes
- Export notes as text files
- Auto-saving
- Sync across devices (using Chrome Storage)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd notepad-extension
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in Chrome:
- Open Chrome and navigate to `chrome://extensions/`
- Enable "Developer mode" in the top right
- Click "Load unpacked"
- Select the `dist` folder from this project

## Development

To start development:

1. Make your changes in the `src` directory
2. Run the build command:
```bash
npm run build
```
3. Reload the extension in Chrome

## Project Structure

```
notepad-extension/
├── src/                 # Source files
│   ├── ChromeNotepad.js # Main component
│   ├── index.js        # Entry point
│   └── styles.css      # Styles
├── public/             # Static files
│   └── index.html      # HTML template
├── dist/               # Built extension (not in repository)
├── manifest.json       # Extension manifest
├── webpack.config.js   # Webpack configuration
└── package.json        # Project dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
=======
# notepad-extension
>>>>>>> 5d84b50cc5a7e41bd2ee09ac2f5fd114bcc5e986
