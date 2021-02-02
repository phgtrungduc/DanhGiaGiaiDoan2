Imports System.Data.SqlClient
Imports System.Reflection
Imports MISA.QLNH.BO

Public Class BaseDL(Of T)

    Private Property _storedNameSelectAll = "dbo.Proc_Get{0}"

    Private Property _connectionString = "Data Source=DESKTOP-44V7V0T;Initial Catalog=WEB1020_MISACukCuk_PTDuc;Integrated Security=True"

    Public Function GetAll(start As Integer, limit As Integer, where As String)

        Dim storedName As String = String.Format(_storedNameSelectAll, GetType(T).Name)
        Dim param = New With {.start = start, .limit = limit, .where = where}
        Return ExecuteReader(storedName, param)
    End Function

    Public Function GetOne(storeName As String, param As Object) As List(Of T)
        Return ExecuteReader(storeName, param)
    End Function

    ''' <summary>
    ''' Sử dụng excute reader lấy dữ liệu từ DB
    ''' </summary>
    ''' <param name="storedName">Tên store</param>
    ''' <param name="param">object truyền vào chứa các tham số cho store</param>
    ''' <returns></returns>
    Public Function ExecuteReader(storedName As String, Optional param As Object = Nothing) 
        Dim result As New List(Of T)
        Dim count As Integer = 0
        Dim hasOutput As Boolean = False
        Using connection As New SqlConnection(_connectionString)
            Dim myCommand As New SqlCommand(storedName, connection)
            Try
                myCommand.CommandType = CommandType.StoredProcedure
                connection.Open()
                If (param IsNot Nothing) Then
                    For Each prop As PropertyInfo In param.GetType().GetProperties()
                        Dim name As String = prop.Name
                        Dim value = prop.GetValue(param)
                        If (name = "where" And value Is Nothing) Then
                            value = ""
                        End If
                        myCommand.Parameters.AddWithValue("@" + name, value)
                    Next
                End If
                myCommand.Parameters.Add("@totalCount", SqlDbType.Int)
                myCommand.Parameters("@totalCount").Direction = ParameterDirection.Output
                Dim myReader As SqlDataReader = myCommand.ExecuteReader()
                Dim obj As T
                While (myReader.Read())
                    obj = Activator.CreateInstance(Of T)()
                    For Each prop As PropertyInfo In obj.GetType().GetProperties()
                        If (prop.Name <> "EditMode" And prop.Name <> "CreatedDate" And prop.Name <> "CreateBy" And prop.Name <> "ModifiedBy") Then
                            If Not Object.Equals(myReader(prop.Name), DBNull.Value) Then
                                prop.SetValue(obj, myReader(prop.Name), Nothing)
                            End If
                        End If
                    Next
                    result.Add(obj)
                End While
                myReader.Close()
                count = myCommand.Parameters("@totalCount").Value
            Catch ex As Exception
                Console.WriteLine(ex.ToString())
            Finally
                connection.Close()
            End Try
        End Using
        Return New With {.total = count, .items = result}
    End Function

    'Public Function ExecuteOne(storedName As String, param As Object)
    '    Dim result As T
    '    Using connection As New SqlConnection(_connectionString)
    '        Using myCommand As New SqlCommand(storedName, connection)
    '            Try
    '                myCommand.CommandType = CommandType.StoredProcedure
    '                connection.Open()
    '                Dim proName As String = param.name
    '                Dim proType As String = GetType(T).GetProperty(proName).PropertyType.Name
    '                myCommand.Parameters.AddWithValue("@" + proName, param.value)
    '                Dim myReader As SqlDataReader = myCommand.ExecuteReader()
    '                Dim obj As T
    '                While (myReader.Read())
    '                    obj = Activator.CreateInstance(Of T)()
    '                    For Each prop As PropertyInfo In obj.GetType().GetProperties()
    '                        If (prop.Name <> "EditMode" And prop.Name <> "CreatedDate" And prop.Name <> "CreateBy" And prop.Name <> "ModifiedDate" And prop.Name <> "ModifiedBy") Then
    '                            If Not Object.Equals(myReader(prop.Name), DBNull.Value) Then
    '                                prop.SetValue(obj, myReader(prop.Name), Nothing)
    '                            End If
    '                        End If
    '                    Next
    '                    result = obj
    '                    Exit While
    '                End While
    '            Catch ex As Exception
    '                Console.WriteLine(ex.ToString())
    '            Finally
    '                connection.Close()
    '            End Try
    '        End Using
    '    End Using
    '    Return result
    'End Function


    ''' <summary>
    ''' Thêm một bản ghi vào DB
    ''' </summary>
    ''' <param name="obj">object truyền từ client lên để thêm vào DB</param>
    ''' <returns></returns>
    Public Function InsertOne(obj As T) As Boolean
        Dim res As Boolean
        Dim storeName As String = "Proc_Insert" + GetType(T).Name
        Using connection As New SqlConnection(_connectionString)
            Dim myCommand As New SqlCommand(storeName, connection)
            Try
                myCommand.CommandType = CommandType.StoredProcedure
                connection.Open()
                For Each prop As PropertyInfo In GetType(T).GetProperties()

                    If (prop.Name <> "EditMode" And prop.Name <> "CreatedDate" And prop.Name <> "CreateBy" And prop.Name <> "ModifiedBy") Then
                        Dim value = prop.GetValue(obj)
                        If value = Nothing Then value = DBNull.Value
                        Dim name = prop.Name

                        If (name = GetType(T).Name + "Id") Then
                            myCommand.Parameters.AddWithValue("@" + name, Guid.NewGuid())
                        ElseIf (name = "ModifiedDate") Then
                            Dim date1 As Date = DateTime.Now
                            myCommand.Parameters.AddWithValue("@ModifiedDate", date1)
                        Else
                            myCommand.Parameters.AddWithValue("@" + name, value)

                        End If
                    End If
                Next
                res = If(myCommand.ExecuteNonQuery() > 0, True, False)
            Catch ex As Exception
                Console.WriteLine(ex.ToString())
            Finally
                connection.Close()
            End Try
        End Using
        Return res
    End Function



    ''' <summary>
    ''' Thực hiện việc filter dữ liệu
    ''' </summary>
    ''' <param name="start">bắt đầu lấy từ bản ghi</param>
    ''' <param name="limit">lấy tối đa số bản ghi từ vị trí bắt đầu</param>
    ''' <param name="where">điều kiện lấy</param>
    ''' <returns></returns>
    Public Function FilterData(start As Integer, limit As Integer, where As String)
        Dim storeName As String = "Proc_Filter" + GetType(T).Name
        Dim count As Integer
        Dim result As New List(Of T)
        Using connection As New SqlConnection(_connectionString)
            Dim myCommand As New SqlCommand(storeName, connection)
            Try

                connection.Open()
                myCommand.CommandType = CommandType.StoredProcedure
                myCommand.Parameters.AddWithValue("@start", start)
                myCommand.Parameters.AddWithValue("@limit", limit)
                myCommand.Parameters.AddWithValue("@where", where)
                myCommand.Parameters.Add("@totalCount", SqlDbType.Int)
                myCommand.Parameters("@totalCount").Direction = ParameterDirection.Output
                Dim myReader As SqlDataReader = myCommand.ExecuteReader()
                Dim obj As T
                While (myReader.Read())
                    obj = Activator.CreateInstance(Of T)()
                    For Each prop As PropertyInfo In obj.GetType().GetProperties()
                        If (prop.Name <> "EditMode" And prop.Name <> "CreatedDate" And prop.Name <> "CreateBy" And prop.Name <> "ModifiedBy") Then
                            If Not Object.Equals(myReader(prop.Name), DBNull.Value) Then
                                prop.SetValue(obj, myReader(prop.Name), Nothing)
                            End If
                        End If
                    Next
                    result.Add(obj)
                End While
                myReader.Close()
                count = myCommand.Parameters("@totalCount").Value
            Catch ex As Exception
                Console.WriteLine(ex.ToString())
            Finally
                connection.Close()
            End Try
        End Using
        Return New With {.total = count, .items = result}
    End Function


    ''' <summary>
    ''' Update một bản ghi trong DB
    ''' </summary>
    ''' <param name="obj">đối tượng truyền lên để update</param>
    ''' <returns></returns>
    Public Function UpdateOne(obj As T) As Boolean
        Dim res As Boolean
        Dim storeName As String = "Proc_Update" + GetType(T).Name
        Using connection As New SqlConnection(_connectionString)
            Using command As New SqlCommand(_connectionString, connection)
                Dim myCommand As New SqlCommand(storeName, connection)

                Try
                    myCommand.CommandType = CommandType.StoredProcedure
                    connection.Open()
                    Dim date1 As Date = DateTime.Now
                    myCommand.Parameters.AddWithValue("@ModifiedDate", date1)
                    For Each prop As PropertyInfo In GetType(T).GetProperties()
                        If (prop.Name <> "EditMode" And prop.Name <> "CreatedDate" And prop.Name <> "CreateBy" And prop.Name <> "ModifiedBy" And prop.Name <> "ModifiedDate") Then
                            Dim value = prop.GetValue(obj)
                            If value = Nothing Then value = DBNull.Value
                            Dim name = prop.Name
                            myCommand.Parameters.AddWithValue("@" + name, value)
                        End If
                    Next
                    Dim result = myCommand.ExecuteNonQuery()
                    res = If(result > 0, True, False)
                Catch ex As Exception
                    Console.WriteLine(ex.ToString())
                Finally
                    command.Dispose()
                    connection.Close()
                End Try
            End Using
        End Using
        Return res
    End Function


    ''' <summary>
    ''' Xóa một bản ghi 
    ''' </summary>
    ''' <param name="id">id của bản ghi cần xóa</param>
    ''' <returns></returns>
    Public Function DeleteOne(id As String)
        Dim nameEntity = GetType(T).Name
        Dim storedName As String = "Proc_Delete" + nameEntity
        Dim row As Integer
        Using connection As New SqlConnection(_connectionString)
            Using command As New SqlCommand(_connectionString, connection)
                Dim myCommand As New SqlCommand(storedName, connection)
                Try
                    myCommand.CommandType = CommandType.StoredProcedure
                    connection.Open()
                    myCommand.Parameters.AddWithValue("@" + nameEntity + "Id", id)
                    row = myCommand.ExecuteNonQuery()
                Catch ex As Exception
                    Console.WriteLine(ex.ToString())
                Finally

                    command.Dispose()
                    connection.Close()
                End Try
            End Using
        End Using
        Return row
    End Function


    ''' <summary>
    ''' Lấy ra giá trị code lớn nhất ứng với 1 bảng trong DB
    ''' </summary>
    ''' <returns></returns>
    Public Function GetMaxCode()
        Dim storedName As String = "Proc_GetMaxCode"
        Dim res = Nothing
        Dim nameEntity = GetType(T).Name
        Using connection As New SqlConnection(_connectionString)
            Using myCommand As New SqlCommand(storedName, connection)
                Try
                    myCommand.CommandType = CommandType.StoredProcedure
                    connection.Open()
                    myCommand.Parameters.AddWithValue("@TableName", nameEntity)
                    Dim myReader As SqlDataReader = myCommand.ExecuteReader()
                    Dim obj = Activator.CreateInstance(Of AutoId)
                    While (myReader.Read())
                        For Each prop As PropertyInfo In obj.GetType().GetProperties()
                            If (prop.Name = "Value") Then
                                Dim value = String.Format("{0:D6}", myReader(prop.Name))
                                prop.SetValue(obj, value, Nothing)
                            Else
                                prop.SetValue(obj, myReader(prop.Name), Nothing)
                            End If

                        Next
                        Exit While
                    End While
                    res = obj
                Catch ex As Exception
                    Console.WriteLine(ex.ToString())
                Finally
                    connection.Close()
                End Try
            End Using
        End Using
        Return res
    End Function


    ''' <summary>
    ''' Update giá trị code lớn nhất trong DB của một bảng
    ''' </summary>
    ''' <returns></returns>
    Public Function UpdateAutoId() As Boolean
        Dim res As Boolean
        Dim storeName As String = "Proc_UpdateAutoId"
        Using connection As New SqlConnection(_connectionString)
            Using command As New SqlCommand(_connectionString, connection)
                Dim myCommand As New SqlCommand(storeName, connection)

                Try
                    myCommand.CommandType = CommandType.StoredProcedure
                    connection.Open()
                    Dim date1 As Date = Date.Now
                    myCommand.Parameters.AddWithValue("@TableName", GetType(T).Name)
                    res = If(myCommand.ExecuteNonQuery() > 0, True, False)
                Catch ex As Exception
                    Console.WriteLine(ex.ToString())
                Finally
                    command.Dispose()
                    connection.Close()
                End Try
            End Using
        End Using
        Return res
    End Function


    ''' <summary>
    ''' Lấy ra kiểu dữ liệu của một đối tượng
    ''' </summary>
    ''' <param name="sampleType">đối tượng cần lấy ra kiểu dữ liệu</param>
    ''' <returns></returns>
    Public Function GetTypeName(sampleType As Type) As String

        Dim nullableType = Nullable.GetUnderlyingType(sampleType)

        Dim isNullableType As Boolean = nullableType <> Nothing

        If (isNullableType) Then
            Return nullableType.Name
        Else
            Return sampleType.Name
        End If
    End Function
End Class
