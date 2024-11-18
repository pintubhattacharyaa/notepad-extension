# Chrome Quick Notes Extension

A Chrome extension for taking and managing notes directly in your browser.

## Features

- Create and manage multiple notes
![image](https://github.com/user-attachments/assets/e418ca66-c862-4575-a9eb-0c4303e83cf4)

- Search through your notes
![image](https://github.com/user-attachments/assets/07cbbb99-fcd3-4ede-b148-4d8e4ddc0f68)

- Export notes as text files
![image](https://github.com/user-attachments/assets/02910107-a259-40b4-adcf-827f614ffd3b)

- Auto-saving
![image](https://github.com/user-attachments/assets/d4ce015c-8db2-47a6-8975-09fda5b53e47)

- Sync across devices (using Chrome Storage)
![image](https://github.com/user-attachments/assets/81f1f9ba-f642-4a90-942f-1e17366142d6)

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

