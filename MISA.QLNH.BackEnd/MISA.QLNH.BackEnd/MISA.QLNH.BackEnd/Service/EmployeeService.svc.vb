' NOTE: You can use the "Rename" command on the context menu to change the class name "EmployeeService" in code, svc and config file together.
' NOTE: In order to launch WCF Test Client for testing this service, please select EmployeeService.svc or EmployeeService.svc.vb at the Solution Explorer and start debugging.
Imports System.IO
Imports System.Reflection
Imports MISA.QLNH.BL
Imports MISA.QLNH.BO
Imports MISA.QLNH.Library.Enumerate
Imports Newtonsoft.Json

Public Class EmployeeService
    Implements IEmployeeService
    Dim employeeBL As EmployeeBL = New EmployeeBL()
    ''' <summary>
    ''' Lấy ra nhân viên
    ''' </summary>
    ''' <param name="start">Vị trí bắt đầu</param>
    ''' <param name="limit">Số lượng bản ghi tối đa từ vị trí bắt đầu</param>
    ''' <param name="code">mã nhân viên</param>
    ''' <param name="where">Điều kiện lấy </param>
    ''' <returns></returns>
    Public Function GetEmployees(start As Integer, limit As Integer, code As String, where As String) As Stream Implements IEmployeeService.GetEmployees
        If (code IsNot Nothing) Then
            Dim res As Employee = employeeBL.GetEmployeeByCode(code)
            Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(res)))
        Else
            Dim result = employeeBL.GetAll(start, limit, where)
            Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(result)))
        End If
    End Function

    ''' <summary>
    ''' TÌm kiếm nhân viên theo Id
    ''' </summary>
    ''' <param name="id">Id nhân viên</param>
    ''' <returns></returns>
    Public Function GetEmployeeById(id As String) As Stream Implements IEmployeeService.GetEmployeeById
        Dim res As Employee = employeeBL.GetEmployeeById(id)
        Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(res)))
    End Function

    ''' <summary>
    ''' thực hiện thêm hoặc update nhân viên
    ''' </summary>
    ''' <param name="employee">object nhân viên cần thêm</param>
    ''' <returns></returns>
    Public Function SaveEmployee(employee As Employee) As Stream Implements IEmployeeService.SaveEmployee
        Dim res = employeeBL.SaveData(employee)
        Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(res)))
    End Function


    ''' <summary>
    ''' Xóa nhân viên 
    ''' </summary>
    ''' <param name="id">id nhân viên cần xóa</param>
    ''' <returns></returns>
    Public Function DeleteEmployee(id As String) As String Implements IEmployeeService.DeleteEmployee
        Dim row = employeeBL.DeleteOne(id)
        If (row = 1) Then
            Return "Success"
        Else
            Return "Failed"
        End If
    End Function

    ''' <summary>
    ''' Lấy ra giá trị mã nhân viên lớn nhất
    ''' </summary>
    ''' <returns></returns>
    Public Function GetMaxCode() As Stream Implements IEmployeeService.GetMaxCode
        Dim res = employeeBL.GetMaxCode()
        Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(res)))
    End Function

    ''' <summary>
    ''' filter nhân viên
    ''' </summary>
    ''' <param name="start">Vị trí bắt đầu</param>
    ''' <param name="limit">Số lượng bản ghi tối đa từ vị trí bắt đầu</param>
    ''' <param name="where">Điều kiện lấy </param>
    ''' <returns></returns>
    Public Function FilterEmployee(start As Integer, limit As Integer, where As String) As Stream Implements IEmployeeService.FilterEmployee
        Dim res = employeeBL.FilterData(start, limit, where)
        Return New MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(res)))
    End Function
End Class
