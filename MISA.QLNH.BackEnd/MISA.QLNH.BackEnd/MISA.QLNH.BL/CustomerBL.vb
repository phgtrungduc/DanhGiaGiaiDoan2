Imports MISA.QLNH.BO
Imports MISA.QLNH.DL
Public Class CustomerBL

    Inherits BaseBL(Of Customer)
    Dim _customerDL As CustomerDL = New CustomerDL()
    Public Function GetCustomerByCode(customerCode As String) As Customer
        Return _customerDL.GetCustomerByCode(customerCode)
    End Function
    Public Function GetCustomerById(customerId As String) As Customer
        Return _customerDL.GetCustomerById(customerId)
    End Function

End Class
