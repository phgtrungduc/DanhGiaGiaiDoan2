' NOTE: You can use the "Rename" command on the context menu to change the class name "CustomerService" in code, svc and config file together.
' NOTE: In order to launch WCF Test Client for testing this service, please select CustomerService.svc or CustomerService.svc.vb at the Solution Explorer and start debugging.
Imports System.IO
Imports MISA.QLNH.BL
Imports MISA.QLNH.BO
Imports MISA.QLNH.Library.Enumerate
Imports Newtonsoft.Json

Public Class CustomerService
    Implements ICustomerService
    Dim customerBL As CustomerBL = New CustomerBL()

    ''' <summary>
    ''' Lấy ra nhân viên
    ''' </summary>
    ''' <param name="start">Vị trí bắt đầu</param>
    ''' <param name="limit">Số lượng bản ghi tối đa từ vị trí bắt đầu</param>
    ''' <param name="code">mã khách hàng</param>
    ''' <param name="where">Điều kiện lấy </param>
    ''' <returns></returns>
    Public Function GetCustomers(start As Integer, limit As Integer, code As String, where As String) As Stream Implements ICustomerService.GetCustomers
        If (code IsNot Nothing) Then
            Dim res As Customer = customerBL.GetCustomerByCode(code)
            Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(res)))
        Else
            Dim result = customerBL.GetAll(start, limit, where)
            Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(result)))
        End If
    End Function

    ''' <summary>
    ''' TÌm kiếm khách hàng theo Id
    ''' </summary>
    ''' <param name="id">Id khách hàng</param>
    ''' <returns></returns>
    Public Function GetCustomerById(id As String) As Stream Implements ICustomerService.GetCustomerById
        Dim res As Customer = customerBL.GetCustomerById(id)
        Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(res)))
    End Function

    ''' <summary>
    ''' thực hiện thêm hoặc update khách hàng
    ''' </summary>
    ''' <param name="customer">object khách hàng cần thêm</param>
    ''' <returns></returns
    Public Function ChangeCustomer(customer As Customer) As Stream Implements ICustomerService.SaveCustomer
        Dim res = customerBL.SaveData(customer)
        Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(res)))
    End Function

    Public Function DeleteCustomer(id As String) As String Implements ICustomerService.DeleteCustomer
        Dim row = customerBL.DeleteOne(id)
        If (row = 1) Then
            Return "Success"
        Else
            Return "Failed"
        End If
    End Function

    ''' <summary>
    ''' Lấy ra giá trị mã khách hàng lớn nhất
    ''' </summary>
    ''' <returns></returns>
    Public Function GetMaxCode() As Stream Implements ICustomerService.GetMaxCode
        Dim res = customerBL.GetMaxCode()
        Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(res)))
    End Function
End Class
