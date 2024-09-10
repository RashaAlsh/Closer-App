export const createOrGetChannelWithUser = ({
  sb,
  userId,
  targetedUserId,
  name,
  setCurrentChannelUrl,
  setError,
  currentUsername,
}) => {
  if (!sb || !userId) {
    setError("SendBird instance or userId is missing.");
    return;
  }

  const params = new sb.GroupChannelParams();
  params.isDistinct = true;
  const userIds = [userId];
  if (targetedUserId) {
    userIds.push(targetedUserId);
  }
  params.addUserIds(userIds);
  params.operatorUserIds = [userId];
  params.name = name ? `Ch: ${name} and ${currentUsername}` : "Inbox";

  sb.GroupChannel.createChannel(params, (groupChannel, error) => {
    if (error) {
      setError(error);
      return;
    }
    setCurrentChannelUrl(groupChannel.url);
  });
};
