$fName = $MyInvocation.MyCommand.Name
$arr = $fName.split("_")
$instId = $arr[0]
$region = $arr[1]

Write-Host "STARTING Environment"

Stop-EC2Instance -InstanceId $instId -Region $region 

Write-Host "Environment started"