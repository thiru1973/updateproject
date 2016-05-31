$mongoDbDriverPath = "C:\mongo\"
$dbName = "test"
$collectionName = "TMProfile"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Bson.dll"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Driver.dll"
$db = [MongoDB.Driver.MongoDatabase]::Create("mongodb://172.29.59.62:27017/$($dbName)")
$collection = $db[$collectionName]

#Write-Host $collection
$query = new-object MongoDB.Driver.QueryDocument("tmp_id",1)
$results = $collection.FindOne($query)
#Write-Host $results
$ProfileName = $results[2]
$DomainName = $results[3]
$LBMethod  = $results[4]
$MonitorPort = $results[5]
$MonitorProtocol = $results[6]
$MonitorPath = $results[7]
$Ttl = $results[8]
$CloudService = $results[9]

Write-Host $ProfileName,$DomainName,$LBMethod,$MonitorPort,$MonitorProtocol,$MonitorPath,$Ttl

$Subscriptions = Get-AzureSubscription

New-AzureTrafficManagerProfile -Name $ProfileName -DomainName $DomainName `
-LoadBalancingMethod $LBMethod -MonitorPort $MonitorPort -MonitorProtocol $MonitorProtocol `
-MonitorRelativePath $MonitorPath -Ttl $Ttl

$TrafficManagerProfile = Get-AzureTrafficManagerProfile -Name $ProfileName;

Add-AzureTrafficManagerEndpoint -TrafficManagerProfile $TrafficManagerProfile -DomainName $CloudService -Type CloudService -Status Enabled;

Set-AzureTrafficManagerProfile -TrafficManagerProfile $TrafficManagerProfile;