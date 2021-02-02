Imports MISA.QLNH.BO
Imports System.Linq
Public Class EmployeeDL
    Inherits BaseDL(Of Employee)
    ''' <summary>
    ''' Tìm kiếm nhân viên theo mã nhân viên
    ''' </summary>
    ''' <param name="employeeCode">mã nhân viên</param>
    ''' <returns></returns>
    Public Function GetEmployeeByCode(employeeCode As String) As Employee
        Dim storeName As String = "Proc_GetEmployeeByCode"
        Dim param = New With {.EmployeeCode = employeeCode}
        Return ExecuteReader(storeName, param)?.FirstOrDefault()
    End Function

    ''' <summary>
    ''' Tìm kiếm nhân viên theo Id
    ''' </summary>
    ''' <param name="employeeId">ID nhân viên</param>
    ''' <returns></returns>
    Public Function GetEmployeeById(employeeId As String) As Employee
        Dim storeName As String = "Proc_GetEmployeeById"
        Dim param = New With {.EmployeeId = employeeId}
        Return ExecuteReader(storeName, param)?.FirstOrDefault()

    End Function
End Class
