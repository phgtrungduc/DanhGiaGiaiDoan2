Imports System.IO
Imports System.ServiceModel
Imports System.ServiceModel.Web
Imports MISA.QLNH.BO
' NOTE: You can use the "Rename" command on the context menu to change the interface name "ICustomerService" in both code and config file together.
<ServiceContract()>
Public Interface ICustomerService

    <OperationContract()>
    <WebInvoke(Method:="GET", UriTemplate:="/customer?start={start}&limit={limit}&employeecode={code}&where={where}", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function GetCustomers(start As Integer, limit As Integer, code As String, where As String) As Stream

    <OperationContract()>
    <WebInvoke(Method:="GET", UriTemplate:="/customer/{id}", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function GetCustomerById(id As String) As Stream

    <OperationContract()>
    <WebInvoke(Method:="POST", UriTemplate:="/customer", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function SaveCustomer(customer As Customer) As Stream

    <OperationContract()>
    <WebInvoke(Method:="GET", UriTemplate:="/maxcode", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function GetMaxCode() As Stream

    <OperationContract()>
    <WebInvoke(Method:="POST", UriTemplate:="/customer/{id}", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function DeleteCustomer(id As String) As String
End Interface
