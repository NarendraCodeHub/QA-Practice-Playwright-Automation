# QA Practice Playwright Automation

## Project Overview
This repository contains automation test scripts written using [Playwright](https://playwright.dev/) to test various functionalities on the `https://qa-practice.netlify.app/` website. The project demonstrates end-to-end testing capabilities, covering different scenarios such as alerts, dropdowns, file uploads, tables, etc.

## File Structure
```
QA-Practice-Playwright-Automation/
├── pages/
│   ├── LoginPage.js
│   ├── RecoverPasswordPage.js
│   ├── RegisterPage.js
├── test-results/
│   ├── playwright-report/
├── tests/
│   ├── Alerts/
│   │   ├── Alert.spec.js
│   │   ├── BtnActions.spec.js
│   │   ├── DoubleClickBtn.spec.js
│   │   ├── MouseHover.spec.js
│   │   ├── Scrolling.spec.js
│   │   ├── ShowHideElement.spec.js
│   ├── Buttons/
│   │   ├── Checkbox.spec.js
│   │   ├── RadioButtons.spec.js
│   ├── Date Picker/
│   │   ├── DatePickers.spec.js
│   ├── Dropdowns/
│   │   ├── Dropdown.spec.js
│   ├── File Upload/
│   │   ├── FileUpload.spec.js
│   │   ├── Solar_system.png
│   ├── Forms/
│   │   ├── Login.spec.js
│   │   ├── RecoverPassword.spec.js
│   │   ├── Register.spec.js
│   ├── Iframes/
│   │   ├── Iframes.spec.js
│   ├── Loader/
│   │   ├── Loader.spec.js
│   ├── New Tab or Window/
│   │   ├── NewBrowserTab.spec.js
│   │   ├── NewBrowserWindow.spec.js
│   ├── Pagination/
│   │   ├── Pagination.spec.js
│   ├── Tables/
│       ├── DynamicTable.spec.js
│       ├── StaticTable.spec.js
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── playwright.config.js
```

## Features Covered
The scripts are organized into categories for easy navigation and maintenance:

- **Alerts**: Handle and validate alert dialogs, button actions, and mouse events.
- **Buttons**: Test interactions with checkboxes and radio buttons.
- **Date Pickers**: Validate date selection functionality.
- **Dropdowns**: Verify dropdown menu options.
- **File Upload**: Test the file upload functionality with various file types.
- **Forms**: Cover login, registration, and password recovery scenarios.
- **Iframes**: Interact with iframe elements.
- **Loader**: Validate the appearance of loaders.
- **New Tab or Window**: Test navigation to new tabs or windows.
- **Pagination**: Verify pagination functionality.
- **Tables**: Interact with dynamic and static tables.

## How to Use This Repository

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (ensure it is version 16 or higher).
2. Install a package manager such as npm or yarn.

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/NarendraCodeHub/QA-Practice-Playwright-Automation.git
   ```
2. Navigate to the project directory:
   ```bash
   cd QA-Practice-Playwright-Automation
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Tests
1. Run all tests:
   ```bash
   npx playwright test
   ```
2. Run a specific test file:
   ```bash
   npx playwright test tests/<category>/<file>.spec.js
   ```
3. View the test report:
   ```bash
   npx playwright show-report
   ```

### Customize Configurations
Modify the `playwright.config.js` file to change settings such as browser type, test directory, timeout, or parallel execution.

## Contributions
Feel free to contribute by creating pull requests for any bug fixes or new features. Ensure your code follows the project's style and is well-documented.

## License
This project is licensed under the [MIT License](LICENSE).

---

If you encounter any issues or have suggestions for improvements, please open an issue in the repository.


