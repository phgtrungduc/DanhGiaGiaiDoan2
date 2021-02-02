Imports System.Runtime.Serialization
Imports MISA.QLNH.Library

<DataContract>
Public Class Repository
    Inherits BaseEntity
    ''' <summary>
    ''' ID kho
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property RepositoryId As Guid
    ''' <summary>
    ''' mã kho
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    <Required>
    Public Property RepositoryCode As String
    ''' <summary>
    ''' Tên kho
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    <Required>
    Public Property RepositoryName As String
    ''' <summary>
    ''' Địa chỉ kho
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property Address As String

End Class
