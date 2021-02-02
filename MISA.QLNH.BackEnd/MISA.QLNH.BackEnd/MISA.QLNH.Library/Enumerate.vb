Public Class Enumerate
    Public Enum EditMode
        None = 0
        Add = 1
        View = 2
        Update = 3
        Delete = 4
        Duplicate = 5
    End Enum
    Public Enum WorkStatus
        ''' <summary>
        ''' Thử việc
        ''' </summary>
        Probationary = 0
        ''' <summary>
        ''' Chính thức
        ''' </summary>
        Official = 1
    End Enum
    Public Enum StatusCode
        ''' <summary>
        ''' Thử việc
        ''' </summary>
        Success = 1000
        ''' <summary>
        ''' Chính thức
        ''' </summary>
        NotSuccess = 999
    End Enum
End Class
