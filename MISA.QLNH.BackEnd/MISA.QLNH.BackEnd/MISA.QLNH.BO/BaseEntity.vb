Imports System.Runtime.Serialization
Imports MISA.QLNH.Library.Enumerate
<DataContract>
Public Class BaseEntity
    ''' <summary>
    ''' Trạng thái object
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property EditMode As EditMode
    ''' <summary>
    ''' Ngày tạo
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property CreatedDate As DateTime?
    ''' <summary>
    ''' Người tạo
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property CreateBy As String
    ''' <summary>
    ''' Ngày sửa
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property ModifiedDate As DateTime?
    ''' <summary>
    ''' Người sửa
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property ModifiedBy As String

End Class
