export function testArgs (args,regx){
  if (args !=='' || regx !==''){
    return regx.test(args)
  }
}
