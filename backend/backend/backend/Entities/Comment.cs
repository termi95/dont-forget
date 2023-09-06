namespace backend.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int AssignmentId { get; set; }
        public DateTime Added { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}
