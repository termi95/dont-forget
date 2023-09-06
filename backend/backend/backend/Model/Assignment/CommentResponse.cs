namespace backend.Model.Assignment
{
    public class CommentResponse
    {
        public int Id { get; set; }
        public string Message { get; set; } = string.Empty;
        public string User { get; set; } = string.Empty;
        public DateTime Added { get; set; }
    }
}
