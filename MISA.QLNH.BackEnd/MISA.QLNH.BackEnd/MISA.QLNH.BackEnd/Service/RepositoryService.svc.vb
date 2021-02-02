' NOTE: You can use the "Rename" command on the context menu to change the class name "RepositoryService" in code, svc and config file together.
' NOTE: In order to launch WCF Test Client for testing this service, please select RepositoryService.svc or RepositoryService.svc.vb at the Solution Explorer and start debugging.
Imports System.IO
Imports MISA.QLNH.BL
Imports MISA.QLNH.BO
Imports Newtonsoft.Json

Public Class RepositoryService
    Implements IRepositoryService
    Dim repositoryBL As RepositoryBL = New RepositoryBL()
    ''' <summary>
    ''' Lấy ra kho
    ''' </summary>
    ''' <param name="start">Vị trí bắt đầu</param>
    ''' <param name="limit">Số lượng bản ghi tối đa từ vị trí bắt đầu</param>
    ''' <param name="code">mã kho</param>
    ''' <param name="where">Điều kiện lấy </param>
    ''' <returns></returns>
    Public Function GetRepository(start As Integer, limit As Integer, code As String, where As String) As Stream Implements IRepositoryService.GetRepository
        If (code IsNot Nothing) Then
            Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject("Dang phat trien")))
        Else
            Dim result = repositoryBL.GetAll(start, limit, where)
            Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(result)))
        End If
    End Function

    ''' <summary>
    ''' thực hiện thêm hoặc update kho
    ''' </summary>
    ''' <param name="repository">object kho cần thêm</param>
    ''' <returns></returns>
    Public Function SaveRepository(repository As Repository) As Stream Implements IRepositoryService.SaveRepository
        Dim res = repositoryBL.SaveData(repository)
        Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(res)))
    End Function

    Public Function DeleteRepository(id As String) As String Implements IRepositoryService.DeleteRepository
        Dim row = repositoryBL.DeleteOne(id)
        If (row = 1) Then
            Return "Success"
        Else
            Return "Failed"
        End If
    End Function

    Public Function GetMaxCode() As Stream Implements IRepositoryService.GetMaxCode
        Dim res = repositoryBL.GetMaxCode()
        Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(res)))
    End Function
End Class
