
$fName = $MyInvocation.MyCommand.Name
$arr = $fName.split("_")
$vmName = $arr[0]

Write-Host "STARTING Environment"

aws ec2 start-instances --instance-ids i-0662382776da732eb

Write-Host "ENVIRONMENTIS STARTED"
exit 1