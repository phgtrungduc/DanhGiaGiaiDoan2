Imports System.IO
Imports System.ServiceModel
Imports System.ServiceModel.Web
Imports MISA.QLNH.BO

' NOTE: You can use the "Rename" command on the context menu to change the interface name "IEmployeeService" in both code and config file together.
<ServiceContract()>
Public Interface IEmployeeService

    <OperationContract()>
    <WebInvoke(Method:="GET", UriTemplate:="/employee?start={start}&limit={limit}&employeecode={code}&where={where}", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function GetEmployees(start As Integer, limit As Integer, code As String, where As String) As Stream

    '<OperationContract()>
    '<WebInvoke(Method:="GET", UriTemplate:="/employee?employeecode={code}", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    'Function GetEmployeeByCode(code As String) As Stream

    <OperationContract()>
    <WebInvoke(Method:="GET", UriTemplate:="/employee/{id}", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function GetEmployeeById(id As String) As Stream

    <OperationContract()>
    <WebInvoke(Method:="POST", UriTemplate:="/employee", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function SaveEmployee(employee As Employee) As Stream

    <OperationContract()>
    <WebInvoke(Method:="POST", UriTemplate:="/employee/{id}", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function DeleteEmployee(id As String) As String

    <OperationContract()>
    <WebInvoke(Method:="POST", UriTemplate:="/employee/filter", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function FilterEmployee(start As Integer, limit As Integer, where As String) As Stream

    <OperationContract()>
    <WebInvoke(Method:="GET", UriTemplate:="/maxcode", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function GetMaxCode() As Stream

End Interface
