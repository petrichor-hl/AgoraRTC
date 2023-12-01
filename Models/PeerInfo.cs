namespace AgoraRTC.Models
{
    public class PeerInfo(string name, string avatarUrl)
    {
        public string Name { get; set; } = name;
        public string AvatarUrl { get; set; } = avatarUrl;
    }
}
