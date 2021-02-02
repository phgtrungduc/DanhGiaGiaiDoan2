Imports System.IO
Imports System.ServiceModel
Imports System.ServiceModel.Web
Imports MISA.QLNH.BO
' NOTE: You can use the "Rename" command on the context menu to change the interface name "IRepositoryService" in both code and config file together.
<ServiceContract()>
Public Interface IRepositoryService

    <OperationContract()>
    <WebInvoke(Method:="GET", UriTemplate:="/repository?start={start}&limit={limit}&repositorycode={code}&where={where}", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function GetRepository(start As Integer, limit As Integer, code As String, where As String) As Stream



    <OperationContract()>
    <WebInvoke(Method:="POST", UriTemplate:="/repository", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function SaveRepository(repository As Repository) As Stream

    <OperationContract()>
    <WebInvoke(Method:="POST", UriTemplate:="/repository/{id}", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function DeleteRepository(id As String) As String


    <OperationContract()>
    <WebInvoke(Method:="GET", UriTemplate:="/maxcode", ResponseFormat:=WebMessageFormat.Json, RequestFormat:=WebMessageFormat.Json, BodyStyle:=WebMessageBodyStyle.WrappedRequest)>
    Function GetMaxCode() As Stream

End Interface
