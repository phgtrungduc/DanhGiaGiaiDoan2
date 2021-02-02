Imports MISA.QLNH.BO
Imports MISA.QLNH.DL

Public Class EmployeeBL
    Inherits BaseBL(Of Employee)
    Dim _employeeDL As EmployeeDL = New EmployeeDL()

    Public Function GetEmployeeByCode(employeeCode As String) As Employee
        Return _employeeDL.GetEmployeeByCode(employeeCode)
    End Function
    Public Function GetEmployeeById(employeeId As String) As Employee
        Return _employeeDL.GetEmployeeById(employeeId)
    End Function

    'Public Overrides Sub AfterSaveData(obj As Employee)
    '    MyBase.AfterSaveData(obj)


    'End Sub
End Class
