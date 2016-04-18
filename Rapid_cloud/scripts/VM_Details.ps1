$VMDetails = "C:\Users\sangamesh.b\Desktop\scripts\" + "VMDetails-" + (Get-Date -Format dd-MMM-yyyy-hh-mm-ss) + ".csv"


$Subscriptions = Get-AzureSubscription

ForEach($Subscription in $Subscriptions)

{

    $SubscriptionName = $Subscription.SubscriptionName

    Select-AzureSubscription -SubscriptionName $SubscriptionName

    $VMs = Get-AzureVM

    Foreach($VM in $VMs)

        {

            $VM | Get-AzureOSDisk | Select-Object @{Name="VM Name";Expression={$VM.Name}}, `
            OS, `
            @{Name="Ip Address";Expression={$VM.IpAddress}}, `
            @{Name="Service Name";Expression={$VM.ServiceName}}, `
            @{Name="Location";Expression={(Get-AzureService -ServiceName $VM.ServiceName).Location}}, `
            @{Name="Status";Expression={$VM.Status}}, `
            @{Name="InstanceSize";Expression={$VM.InstanceSize}}, `
            @{Name="Virtual Network Name";Expression={$VM.VirtualNetworkName}}, `
            @{Name="Subscription Name";Expression={$SubscriptionName}} | Export-Csv -Path $VMDetails -Delimiter "," -NoTypeInformation -Append

        }
   
}