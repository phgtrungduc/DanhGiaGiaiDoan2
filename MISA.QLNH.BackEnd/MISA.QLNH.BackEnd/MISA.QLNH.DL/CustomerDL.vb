Imports MISA.QLNH.BO
Public Class CustomerDL
    Inherits BaseDL(Of Customer)
    ''' <summary>
    ''' Tìm kiếm khách hàng theo mã khách hàng
    ''' </summary>
    ''' <param name="customerCode">mã khách hàng</param>
    ''' <returns></returns>
    Public Function GetCustomerByCode(customerCode As String) As Customer
        Dim storeName As String = "Proc_GetCustomerByCode"
        Dim param = New With {.CustomerCode = customerCode}
        Return ExecuteReader(storeName, param)?.FirstOrDefault()
    End Function

    ''' <summary>
    ''' Tìm kiếm khách hàng theo ID
    ''' </summary>
    ''' <param name="customerId">ID khách hàng</param>
    ''' <returns></returns>
    Public Function GetCustomerById(customerId As String) As Customer
        Dim storeName As String = "Proc_GetCustomerById"
        Dim param = New With {.CustomerId = customerId}
        Return ExecuteReader(storeName, param)?.FirstOrDefault()
    End Function

End Class
