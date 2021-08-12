let {execSync} = require('child_process')
function printMessage(){
  console.log(...arguments, colors.Reset)
}
let spinnerInterval = null
let colors = {
  Reset:"\x1b[0m",
  Bright:"\x1b[1m",
  Dim:"\x1b[2m",
  Underscore:"\x1b[4m",
  Blink:"\x1b[5m",
  Reverse:"\x1b[7m",
  Hidden:"\x1b[8m",

  FgBlack:"\x1b[30m",
  FgRed:"\x1b[31m",
  FgGreen:"\x1b[32m",
  FgYellow:"\x1b[33m",
  FgBlue:"\x1b[34m",
  FgMagenta:"\x1b[35m",
  FgCyan:"\x1b[36m",
  FgWhite:"\x1b[37m",

  BgBlack:"\x1b[40m",
  BgRed:"\x1b[41m",
  BgGreen:"\x1b[42m",
  BgYellow:"\x1b[43m",
  BgBlue:"\x1b[44m",
  BgMagenta:"\x1b[45m",
  BgCyan:"\x1b[46m",
  BgWhite:"\x1b[47m"
}


module.exports = {
  colors,
  printWarning(){
    printMessage(colors.FgYellow,...arguments)
  },
  printAlert(){
    printMessage(colors.FgRed,...arguments)
  },
  printSuccess(){
    printMessage(colors.FgGreen,...arguments)
  },
  printInfo(){
    printMessage(colors.FgCyan,...arguments)
  },
  startSpinner(){
    process.stdout.write("\x1B[?25l")
    const icons = ['-','\\','|','/']
    let i = 0
    spinnerInterval = setInterval(()=>{
      let char = icons[i]
      if(!char){
        i = 0
        char = icons[i]
      }
      process.stdout.write(char)
      process.stdout.moveCursor(-1, 0)
      i++
    },100)
  },
  stopSpinner(){
    clearInterval(spinnerInterval)
  },
  clearScreen() {
    try {
      let cmd = process.platform === "win32" ? 'cls':'clear';
      execSync(cmd);
    } catch (e) {
      
    }
  }

}