public class Solution
{
    public int[] TwoSum(int[] nums, int target)
    {
        for (int i = 0; i < nums.Length; i++)
        {
            int digitToFind = target - nums[i];
            int index = Array.IndexOf(nums, digitToFind);
            if (index != -1)
            {
                return new int[] { i, index };
            }
        }
        throw new Exception();
    }
}