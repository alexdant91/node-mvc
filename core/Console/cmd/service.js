"use strict";require("dotenv").config();var clear=require("clear"),fs=require("fs"),path=require("path"),chalk=require("chalk"),_require=require("process"),exit=_require.exit,_require2=require("./helpers"),processArgv=_require2.processArgv;clear(),console.log(chalk.green.bold("[NodeMVC]: Generating new Service..."));var options=processArgv(),Name=options.name,SubDir=options.subfolder?options.subfolder:"/",ModelNameArgv=Name?Name.charAt(0).toUpperCase()+Name.slice(1):process.argv.slice(2).toString().charAt(0).toUpperCase()+process.argv.slice(2).toString().slice(1);ModelNameArgv&&""!=ModelNameArgv||(console.log(chalk.red.bold("[NodeMVC]: Service name required, run `yarn make:service [SERVICE_NAME]`")),exit(0));var ModelName=ModelNameArgv.replace(/controller/ig,""),ServiceTemplate=require("./templates/service"),ServiceSubPath=path.join(__dirname,"../../../app/Services",SubDir);fs.existsSync(ServiceSubPath)||fs.mkdirSync(ServiceSubPath);var ServicePath=path.join(ServiceSubPath,"".concat(ModelName,".js")),ServiceCode=ServiceTemplate.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase());fs.writeFileSync(ServicePath,ServiceCode),console.log(chalk.green.bold("[NodeMVC]: Service \"".concat(ModelName,"\" successfully created.")));