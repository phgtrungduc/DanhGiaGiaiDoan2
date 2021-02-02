Imports System.Reflection
Imports MISA.QLNH.BO
Imports MISA.QLNH.DL
Imports MISA.QLNH.Library

Public Class BaseBL(Of T)
    Property baseDL As BaseDL(Of T) = Nothing
    Public Sub New()
        _baseDL = New BaseDL(Of T)
    End Sub
    ''' <summary>
    ''' Thực hiện Trước khi thêm hoặc update dữ liệu trong DB
    ''' </summary>
    ''' <param name="obj">đối tượng cần kiểm tra trước khi save</param>
    ''' <returns></returns>
    Protected Overridable Function PreSaveData(obj As T)
        For Each prop As PropertyInfo In GetType(T).GetProperties()
            If (prop.IsDefined(GetType(Required), False)) Then
                Dim data = prop.GetValue(obj)
                If (data = Nothing) Then Return False
            End If
        Next
        Return True
    End Function

    ''' <summary>
    ''' Thực hiện sau khi update hoặc thêm vào DB
    ''' </summary>
    ''' <param name="obj"></param>
    ''' <returns></returns>
    Public Overridable Function AfterSaveData(obj As T) As Boolean
        Return _baseDL.UpdateAutoId()
    End Function
    ''' <summary>
    ''' Lấy ra tất cả các bản ghi
    ''' </summary>
    ''' <param name="start">Bản ghi bắt đầu</param>
    ''' <param name="limit">Số bản ghi tối đa từ vị trí bắt đầu</param>
    ''' <param name="where">Điều kiện lấy</param>
    ''' <returns></returns>
    Public Function GetAll(start As Integer, limit As Integer, where As String)
        Return _baseDL.GetAll(start, limit, where)
    End Function

    ''' <summary>
    ''' Thực hiện thêm hoặc update data trong DB
    ''' </summary>
    ''' <param name="obj">Đối tượng truyền lên để thực hiện thêm hoặc update</param>
    ''' <returns></returns>
    Public Function SaveData(obj As T) As Response
        Dim success = False
        Dim res As Response = New Response()
        res.code = Enumerate.StatusCode.Success
        Try
            Dim validate = PreSaveData(obj)

            If (validate = False) Then
                res.code = Enumerate.StatusCode.NotSuccess
                res.message = "Chua dien du cac truong bat buoc"
                Return res
            End If
            ' goi insertone or updateone or delete
            Dim editMode = GetType(T).GetProperty("EditMode").GetValue(obj)
            If (editMode = Enumerate.EditMode.Add) Then
                success = _baseDL.InsertOne(obj)
            ElseIf (editMode = Enumerate.EditMode.Update) Then
                success = _baseDL.UpdateOne(obj)
            End If
            If (success And editMode = Enumerate.EditMode.Add) Then
                Dim save = AfterSaveData(obj)
                If (save) Then
                    res.message = "Them thanh cong"

                Else
                    res.message = "Tang id that bai"
                    res.code = Enumerate.StatusCode.NotSuccess
                End If
            ElseIf (success And editMode = Enumerate.EditMode.Update) Then
                res.message = "Update thanh cong"
                res.code = Enumerate.StatusCode.Success
            Else
                res.message = "DB error: Thay doi data that bai"
                res.code = Enumerate.StatusCode.NotSuccess
            End If
        Catch ex As Exception
            res.message = "Da co loi xay ra"
            res.code = Enumerate.StatusCode.NotSuccess
            Throw ex
        End Try
        Return res
    End Function

    ''' <summary>
    ''' Xóa một bản ghi trong DB
    ''' </summary>
    ''' <param name="id">id của bản ghi cần xóa</param>
    ''' <returns></returns>
    Public Function DeleteOne(id As String)
        Return _baseDL.DeleteOne(id)
    End Function
    ''' <summary>
    ''' Lấy ra mã lớn nhất trong DB ứng với 1 bảng
    ''' </summary>
    ''' <returns></returns>
    Public Function GetMaxCode()
        Return _baseDL.GetMaxCode()
    End Function


    ''' <summary>
    ''' filter dữ liệu
    ''' </summary>
    ''' <param name="start">Bản ghi bắt đầu</param>
    ''' <param name="limit">Số bản ghi tối đa từ vị trí bắt đầu</param>
    ''' <param name="where">Điều kiện lấy</param>
    ''' <returns></returns>
    Public Function FilterData(start As Integer, limit As Integer, where As String)
        Return _baseDL.FilterData(start, limit, where)
    End Function
End Class
