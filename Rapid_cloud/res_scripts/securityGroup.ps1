$mongoDbDriverPath = "C:\mongo\"
$dbName = "test"
$collectionName = "securityGrp"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Bson.dll"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Driver.dll"
$db = [MongoDB.Driver.MongoDatabase]::Create("mongodb://172.29.59.100:27017/$($dbName)")
$collection = $db[$collectionName]

$query = new-object MongoDB.Driver.QueryDocument("sg_id",1)
$results = $collection.FindOne($query)

$Username = $results[2]
$Password = $results[3]
$SecPassword = Convertto-SecureString -String $password -AsPlainText -Force
$Credential = New-object System.management.Automation.PSCredential $Username, $SecPassword

Add-AzureRmAccount -Credential $Credential

$rule1 = New-AzureRmNetworkSecurityRuleConfig -Name $results[7] -Description "Allow RDP" `
    -Access $results[8] -Protocol $results[9] -Direction $results[6] -Priority $results[10] `
    -SourceAddressPrefix "Internet" -SourcePortRange * `
    -DestinationAddressPrefix * -DestinationPortRange 3389
	
$rule2 = New-AzureRmNetworkSecurityRuleConfig -Name $results[13] -Description "Block Internet" `
    -Access $results[14] -Protocol * -Direction $results[12] -Priority $results[16] `
    -SourceAddressPrefix * -SourcePortRange * `
    -DestinationAddressPrefix Internet -DestinationPortRange *
	
$nsg = New-AzureRmNetworkSecurityGroup -ResourceGroupName $results[4] -Location $results[5] -Name $results[18] `
    -SecurityRules $rule1,$rule2
	
$vnet = Get-AzureRmVirtualNetwork -ResourceGroupName $results[4] -Name $results[19]

<#Set-AzureRmVirtualNetworkSubnetConfig -VirtualNetwork $vnet -Name "FrontEnd" `
    -AddressPrefix 192.168.1.0/24 -NetworkSecurityGroup $nsg#>
	
Set-AzureRmVirtualNetwork -VirtualNetwork $vnet