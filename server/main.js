const {app, BrowserWindow, Menu, Tray} = require('electron')
const path = require('path')
const url = require('url')
const menuManager = require ('./menu-manager')

let win
const iconPath = path.join(__dirname, 'images')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', appReady)

function appReady() {
  menuManager.onAbout = () => {console.log('You REALLY clicked About...')}
  const menu = menuManager.build()
  Menu.setApplicationMenu(menu)

  if (app.dock) {
    app.dock.setIcon(path.join(iconPath, 'icon.png'));
  }

  initTray()
  createWindow()
    
}

function initTray() {
  if (process.platform === 'darwin') {
    tray = new Tray(path.join(iconPath, 'mac-tray.png'))
    tray.setPressedImage(path.join(iconPath, 'mac-tray-pressed.png'))
  } else {
    tray = new Tray(path.join(iconPath, 'icon.ico'))
  }

  tray.setToolTip(app.getName())
  tray.setContextMenu(menuManager.buildTrayMenu())

}

function createWindow () {
    // create new window
    win = new BrowserWindow({
      width: 1200, 
      height: 800,
      title: 'Dispatcher',
      icon: iconPath
    });

    //load url
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../www/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools
    // win.webContents.openDevTools();

    // Closed
    win.on('closed', () => {
        win = null
    })
}

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })