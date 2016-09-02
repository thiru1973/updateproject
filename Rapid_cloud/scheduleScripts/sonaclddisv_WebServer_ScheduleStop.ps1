$Subscriptions = Get-AzureSubscription

$fName = $MyInvocation.MyCommand.Name

$arr = $fName.split("_")
$azurecloud = $arr[0]
$vmname = $arr[1]

Stop-AzureVM -ServiceName $azurecloud -Name $vmname -Force