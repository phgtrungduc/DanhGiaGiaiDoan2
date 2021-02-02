Imports System.Runtime.Serialization
Imports MISA.QLNH.Library

<DataContract>
Public Class Customer
    Inherits BaseEntity
    ''' <summary>
    ''' ID khach hang
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property CustomerId As Guid
    ''' <summary>
    ''' Ma khach hang
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    <Required>
    Public Property CustomerCode As String
    ''' <summary>
    ''' Ten day du
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    <Required>
    Public Property FullName As String
    ''' <summary>
    ''' Ma the thanh vien
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property MemberCardCode As String
    ''' <summary>
    ''' Ngay sinh
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property DateOfBirth As Date?
    ''' <summary>
    ''' Gioi tinh
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property Gender As Integer?
    ''' <summary>
    ''' Email
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property Email As String
    ''' <summary>
    ''' DT di dong
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    <Required>
    Public Property PhoneNumber As String
    ''' <summary>
    ''' Ten cong ty
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property CompanyName As String
    ''' <summary>
    ''' Ma so thue
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property CompanyTaxCode As String
    ''' <summary>
    ''' Dia chi
    ''' </summary>
    ''' <returns></returns>
    <DataMember>
    Public Property Address As String
End Class
