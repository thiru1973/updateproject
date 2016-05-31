$mongoDbDriverPath = "C:\mongo\"
$dbName = "test"
$collectionName = "azureLoadBalancer"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Bson.dll"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Driver.dll"
$db = [MongoDB.Driver.MongoDatabase]::Create("mongodb://172.29.59.62:27017/$($dbName)")
$collection = $db[$collectionName]

#Write-Host $collection
$query = new-object MongoDB.Driver.QueryDocument("lb_id",1)
$results = $collection.FindOne($query)
Write-Host $results

$Subscriptions = Get-AzureSubscription

$svc=$results[2]#"sonatachef"
$ilb=$results[3]#"ilbset"

Add-AzureInternalLoadBalancer -ServiceName $svc -InternalLoadBalancerName $ilb 

$prot=$results[4]#"tcp"
$locport=$results[5]#1433
$pubport=$results[6]#1433
$epname=$results[7]#"TCP-1433-1433"
$lbsetname=$results[8]#"lbset"
$vmname="sonatachef"

Write-Host $svc, $ilb, $prot, $locport, $pubport, $epname, $lbsetname
Get-AzureVM -ServiceName $svc | Add-AzureEndpoint -Name $epname -LbSetName $lbsetname `
-Protocol $prot -LocalPort $locport -PublicPort $pubport -ProbePort 80 -ProbePath /ping -ProbeProtocol http -InternalLoadBalancerName $ilb | Update-AzureVM