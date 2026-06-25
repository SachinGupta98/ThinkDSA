export const patterns = [
  {
    slug: "arrays-hashing",
    name: "Arrays + Hashing",
    color: "#3b82f6",
    icon: "Hash",
    tagline: "Turn O(N²) lookups into O(1) using a HashMap",
    
    what_is_it: `
      Arrays are the most fundamental data structure — a contiguous block of memory holding elements of the same type.
      
      Hashing is the technique of mapping data to a fixed-size value (a hash) so we can store and retrieve it in O(1) time.
      
      Combined, they let us solve problems that would otherwise require nested loops — reducing O(N²) brute force down to O(N).
    `,
    
    when_to_use: `
      Use Arrays + Hashing when:
      - You need to check if something exists fast
      - You need to count frequencies of elements
      - You need to find pairs, complements, or duplicates
      - You need to group elements by a property
    `,
    
    recognition_signals: [
      "Problem asks to find two elements that sum/differ to a target",
      "Problem asks to count frequency of elements",
      "Problem asks to find duplicates or missing numbers",
      "Problem asks to group elements by some property (anagrams, etc)",
      "Brute force solution would be O(N²) with nested loops"
    ],
    
    decision_tree: [
      {
        question: "Do I need fast lookup of previous elements?",
        yes: "Use HashMap or HashSet",
        no: "Consider Two Pointers or simple iteration"
      },
      {
        question: "Do I need the COUNT of each element?",
        yes: "Use HashMap<element, count>",
        no: "Use HashSet (just existence check)"
      },
      {
        question: "Do I need to track the INDEX of elements?",
        yes: "Use HashMap<element, index>",
        no: "Use HashSet<element>"
      }
    ],
    
    common_mistakes: [
      "Using nested loops when a HashMap would work in one pass",
      "Forgetting to handle duplicates in the input",
      "Using a List to check existence (O(N)) instead of a Set (O(1))",
      "Not considering negative numbers or zero as valid elements"
    ],
    
    complexity: {
      time: "O(N) — single pass through array",
      space: "O(N) — HashMap stores up to N elements"
    },
    
    code_examples: {
      problem: "Two Sum — Find indices of two numbers that add up to target",
      
      cpp: `
#include <unordered_map>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // HashMap: stores {value -> index}
    unordered_map<int, int> seen;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        // Check if complement exists in map
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        
        // Store current element with its index
        seen[nums[i]] = i;
    }
    return {}; // No solution found
}
      `,
      
      python: `
def twoSum(nums: list[int], target: int) -> list[int]:
    # Dictionary: stores {value -> index}
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        # Check if complement exists
        if complement in seen:
            return [seen[complement], i]
        
        # Store current number and its index
        seen[num] = i
    
    return []  # No solution found
      `,
      
      java: `
import java.util.HashMap;
import java.util.Map;

public int[] twoSum(int[] nums, int target) {
    // HashMap: stores {value -> index}
    Map<Integer, Integer> seen = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        
        // Check if complement exists
        if (seen.containsKey(complement)) {
            return new int[]{seen.get(complement), i};
        }
        
        // Store current element with index
        seen.put(nums[i], i);
    }
    return new int[]{};
}
      `,
      
      c: `
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, 
            int target, int* returnSize) {
    // Simple hash table using array
    // (for small value ranges)
    int* result = malloc(2 * sizeof(int));
    *returnSize = 2;
    
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    return result;
}
      `
    },
    
    practice_problems: [
      { title: "Two Sum", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum" },
      { title: "Group Anagrams", difficulty: "Medium", link: "https://leetcode.com/problems/group-anagrams" },
      { title: "Top K Frequent Elements", difficulty: "Medium", link: "https://leetcode.com/problems/top-k-frequent-elements" },
      { title: "Longest Consecutive Sequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-consecutive-sequence" },
      { title: "Valid Anagram", difficulty: "Easy", link: "https://leetcode.com/problems/valid-anagram" }
    ]
  },

  {
    slug: "two-pointers",
    name: "Two Pointers",
    color: "#7c3aed",
    icon: "ChevronsLeftRight",
    tagline: "Use two variables to scan from both ends simultaneously",
    
    what_is_it: `
      Two Pointers is a technique where you maintain two index variables that move through the data structure — usually from opposite ends moving inward, or both moving in the same direction at different speeds.
      
      It eliminates the need for nested loops in many problems, reducing O(N²) to O(N).
    `,
    
    when_to_use: `
      Use Two Pointers when:
      - Array or string is SORTED (or can be sorted)
      - You need to find a PAIR that meets a condition
      - You need to compare elements from both ends
      - You need to detect cycles (fast/slow pointer)
      - You need to remove duplicates in-place
    `,
    
    recognition_signals: [
      "Input array is sorted or problem says you can sort it",
      "Looking for a pair or triplet that meets a condition",
      "Problem involves palindrome checking",
      "Problem asks to remove duplicates from sorted array in-place",
      "Need to find if a cycle exists in a linked list"
    ],
    
    decision_tree: [
      {
        question: "Is the array sorted?",
        yes: "Two pointers from both ends",
        no: "Sort first OR use HashMap instead"
      },
      {
        question: "Looking for pair that sums to target?",
        yes: "Left pointer at start, right pointer at end. Move based on sum vs target.",
        no: "Consider sliding window for subarray problems"
      },
      {
        question: "Need to detect a cycle?",
        yes: "Fast pointer moves 2 steps, slow pointer moves 1 step",
        no: "Use opposite-direction pointers"
      }
    ],
    
    common_mistakes: [
      "Forgetting that input must be sorted before applying two pointers",
      "Off-by-one errors when pointers cross each other",
      "Using two pointers when array is unsorted — use HashMap instead",
      "Not handling edge cases: empty array, single element"
    ],
    
    complexity: {
      time: "O(N) — each pointer moves at most N steps",
      space: "O(1) — no extra data structure needed"
    },
    
    code_examples: {
      problem: "Two Sum II — sorted array, find pair that sums to target",
      
      cpp: `
#include <vector>
using namespace std;

vector<int> twoSumSorted(vector<int>& nums, 
                          int target) {
    int left = 0;
    int right = nums.size() - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        
        if (sum == target) {
            // Found the pair
            return {left + 1, right + 1};
        } else if (sum < target) {
            // Need bigger sum → move left up
            left++;
        } else {
            // Need smaller sum → move right down
            right--;
        }
    }
    return {};
}
      `,
      
      python: `
def twoSumSorted(nums: list[int], 
                  target: int) -> list[int]:
    left, right = 0, len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        
        if current_sum == target:
            return [left + 1, right + 1]
        elif current_sum < target:
            left += 1   # Need bigger sum
        else:
            right -= 1  # Need smaller sum
    
    return []
      `,
      
      java: `
public int[] twoSumSorted(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        
        if (sum == target) {
            return new int[]{left + 1, right + 1};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return new int[]{};
}
      `,
      
      c: `
int* twoSumSorted(int* nums, int numsSize, 
                   int target, int* returnSize) {
    int* result = malloc(2 * sizeof(int));
    *returnSize = 2;
    int left = 0, right = numsSize - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) {
            result[0] = left + 1;
            result[1] = right + 1;
            return result;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return result;
}
      `
    },
    
    practice_problems: [
      { title: "Valid Palindrome", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome" },
      { title: "Two Sum II", difficulty: "Medium", link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted" },
      { title: "3Sum", difficulty: "Medium", link: "https://leetcode.com/problems/3sum" },
      { title: "Container With Most Water", difficulty: "Medium", link: "https://leetcode.com/problems/container-with-most-water" },
      { title: "Linked List Cycle", difficulty: "Easy", link: "https://leetcode.com/problems/linked-list-cycle" }
    ]
  },

  {
    slug: "sliding-window",
    name: "Sliding Window",
    color: "#14b8a6",
    icon: "GalleryHorizontal",
    tagline: "Process subarrays efficiently without recomputing from scratch",
    
    what_is_it: `
      Sliding Window is a technique for problems involving contiguous subarrays or substrings.
      Instead of recomputing the entire window from scratch each time, you slide it — adding the new element on the right and removing the old element on the left.
      
      Fixed window: size never changes.
      Variable window: expands and shrinks based on a condition.
    `,
    
    when_to_use: `
      Use Sliding Window when:
      - Problem involves a CONTIGUOUS subarray or substring
      - You need to find MAX or MIN of all subarrays of size K
      - You need longest/shortest subarray meeting a condition
      - Brute force has nested loops over contiguous elements
    `,
    
    recognition_signals: [
      "Keywords: subarray, substring, contiguous, consecutive",
      "Find max/min sum of subarray of size K",
      "Longest substring with at most K distinct characters",
      "Minimum window containing all characters of a pattern",
      "Count subarrays meeting a condition"
    ],
    
    decision_tree: [
      {
        question: "Is the window size FIXED?",
        yes: "Simple sliding window — add right, remove left each step",
        no: "Variable window — expand right until condition breaks, then shrink left"
      },
      {
        question: "Do I need to track character or element FREQUENCY?",
        yes: "Use HashMap inside the window",
        no: "Just track the sum or count"
      }
    ],
    
    common_mistakes: [
      "Using sliding window on non-contiguous subarray problems",
      "Forgetting to shrink the window when condition is violated",
      "Not updating the result before shrinking the window",
      "Off-by-one in window size calculation"
    ],
    
    complexity: {
      time: "O(N) — each element enters and leaves window once",
      space: "O(K) — window size or O(1) for sum problems"
    },
    
    code_examples: {
      problem: "Maximum sum subarray of size K",
      
      cpp: `
#include <vector>
#include <algorithm>
using namespace std;

int maxSumSubarray(vector<int>& nums, int k) {
    int windowSum = 0;
    int maxSum = 0;
    
    // Build first window
    for (int i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    maxSum = windowSum;
    
    // Slide the window
    for (int i = k; i < nums.size(); i++) {
        // Add new element, remove old element
        windowSum += nums[i] - nums[i - k];
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}
      `,
      
      python: `
def maxSumSubarray(nums: list[int], k: int) -> int:
    # Build first window
    window_sum = sum(nums[:k])
    max_sum = window_sum
    
    # Slide the window
    for i in range(k, len(nums)):
        # Add new right element, remove old left
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)
    
    return max_sum
      `,
      
      java: `
public int maxSumSubarray(int[] nums, int k) {
    int windowSum = 0;
    
    // Build first window
    for (int i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    int maxSum = windowSum;
    
    // Slide the window
    for (int i = k; i < nums.length; i++) {
        windowSum += nums[i] - nums[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}
      `,
      
      c: `
int maxSumSubarray(int* nums, int numsSize, int k) {
    int windowSum = 0, maxSum = 0;
    
    for (int i = 0; i < k; i++)
        windowSum += nums[i];
    
    maxSum = windowSum;
    
    for (int i = k; i < numsSize; i++) {
        windowSum += nums[i] - nums[i - k];
        if (windowSum > maxSum) 
            maxSum = windowSum;
    }
    return maxSum;
}
      `
    },
    
    practice_problems: [
      { title: "Maximum Average Subarray I", difficulty: "Easy", link: "https://leetcode.com/problems/maximum-average-subarray-i" },
      { title: "Longest Substring Without Repeating", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters" },
      { title: "Minimum Window Substring", difficulty: "Hard", link: "https://leetcode.com/problems/minimum-window-substring" },
      { title: "Permutation in String", difficulty: "Medium", link: "https://leetcode.com/problems/permutation-in-string" },
      { title: "Fruit Into Baskets", difficulty: "Medium", link: "https://leetcode.com/problems/fruit-into-baskets" }
    ]
  },

  {
    slug: "binary-search",
    name: "Binary Search",
    color: "#f59e0b",
    icon: "Divide",
    tagline: "Eliminate half the search space with every comparison",
    
    what_is_it: `
      Binary Search works by repeatedly dividing the search space in half. Instead of checking every element, you check the middle — if it's too big, eliminate the right half; too small, eliminate the left half.
      
      The key insight: Binary Search works on ANY monotonic function, not just sorted arrays. If you can define a condition that is false...false...TRUE...TRUE in order, binary search can find the boundary.
    `,
    
    when_to_use: `
      Use Binary Search when:
      - Array is sorted
      - Searching for a value in a sorted space
      - Problem asks for minimum/maximum value that satisfies a condition
      - Answer lies in a range and you need to find the optimal value
    `,
    
    recognition_signals: [
      "Input is sorted or rotated sorted array",
      "Find first/last position of element",
      "Minimize the maximum or maximize the minimum",
      "Search in a range of possible answers",
      "Keywords: log N time complexity required"
    ],
    
    decision_tree: [
      {
        question: "Is the array sorted?",
        yes: "Classic binary search on array",
        no: "Binary search on ANSWER RANGE instead"
      },
      {
        question: "Looking for exact value or boundary condition?",
        yes_exact: "Standard binary search",
        yes_boundary: "Find leftmost/rightmost true condition"
      }
    ],
    
    common_mistakes: [
      "Integer overflow: use mid = left + (right-left)/2 NOT (left+right)/2",
      "Infinite loop when left and right don't converge properly",
      "Off-by-one: when to use left <= right vs left < right",
      "Forgetting binary search works on answer space, not just arrays"
    ],
    
    complexity: {
      time: "O(log N) — halves search space each step",
      space: "O(1) iterative, O(log N) recursive"
    },
    
    code_examples: {
      problem: "Classic binary search — find target in sorted array",
      
      cpp: `
#include <vector>
using namespace std;

int binarySearch(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {
        // Avoid integer overflow
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;          // Found it
        } else if (nums[mid] < target) {
            left = mid + 1;      // Search right half
        } else {
            right = mid - 1;     // Search left half
        }
    }
    return -1; // Not found
}
      `,
      
      python: `
def binarySearch(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1   # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1  # Not found
      `,
      
      java: `
public int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}
      `,
      
      c: `
int binarySearch(int* nums, int numsSize, 
                  int target) {
    int left = 0, right = numsSize - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
      `
    },
    
    practice_problems: [
      { title: "Binary Search", difficulty: "Easy", link: "https://leetcode.com/problems/binary-search" },
      { title: "Search in Rotated Sorted Array", difficulty: "Medium", link: "https://leetcode.com/problems/search-in-rotated-sorted-array" },
      { title: "Find Minimum in Rotated Array", difficulty: "Medium", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array" },
      { title: "Koko Eating Bananas", difficulty: "Medium", link: "https://leetcode.com/problems/koko-eating-bananas" },
      { title: "Median of Two Sorted Arrays", difficulty: "Hard", link: "https://leetcode.com/problems/median-of-two-sorted-arrays" }
    ]
  },

  {
    slug: "trees",
    name: "Trees",
    color: "#10b981",
    icon: "GitBranch",
    tagline: "Recursive structure where every node has at most two children",
    
    what_is_it: `
      A tree is a hierarchical data structure. Binary trees have at most 2 children per node.
      BSTs maintain sorted order: left < root < right.
      
      Most tree problems are solved with recursion — the tree itself is a recursive structure, so recursive solutions feel natural.
      The key insight: trust the recursion. Solve for one node, let recursion handle the rest.
    `,
    
    when_to_use: `
      Use Tree algorithms when:
      - Input is explicitly a tree/BST
      - Problem involves hierarchical relationships
      - Need to traverse in specific order (inorder, preorder, postorder)
      - Need to find paths, depths, or diameters
    `,
    
    recognition_signals: [
      "Input is a TreeNode structure",
      "Problem asks for tree height or depth",
      "Problem asks to validate a BST",
      "Find lowest common ancestor",
      "Level-order traversal (BFS on tree)",
      "Path sum from root to leaf"
    ],
    
    decision_tree: [
      {
        question: "Need to process level by level?",
        yes: "BFS with a queue",
        no: "DFS with recursion"
      },
      {
        question: "Need left→root→right order?",
        yes: "Inorder traversal (gives sorted for BST)",
        no: "Preorder (root first) or Postorder (root last)"
      }
    ],
    
    common_mistakes: [
      "Not handling null node base case first",
      "Confusing inorder/preorder/postorder",
      "Using BFS when DFS is simpler and vice versa",
      "Not trusting recursion — trying to manually track state"
    ],
    
    complexity: {
      time: "O(N) — must visit every node",
      space: "O(H) where H is height — O(log N) balanced, O(N) skewed"
    },
    
    code_examples: {
      problem: "Maximum depth of binary tree",
      
      cpp: `
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
};

int maxDepth(TreeNode* root) {
    // Base case: empty tree has depth 0
    if (root == nullptr) return 0;
    
    // Recursively find depth of each subtree
    int leftDepth = maxDepth(root->left);
    int rightDepth = maxDepth(root->right);
    
    // Current depth = 1 + max of children
    return 1 + max(leftDepth, rightDepth);
}
      `,
      
      python: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxDepth(root: TreeNode) -> int:
    # Base case: null node
    if not root:
        return 0
    
    # Recurse on both subtrees
    left_depth = maxDepth(root.left)
    right_depth = maxDepth(root.right)
    
    return 1 + max(left_depth, right_depth)
      `,
      
      java: `
public int maxDepth(TreeNode root) {
    // Base case: null node has depth 0
    if (root == null) return 0;
    
    // Recursively compute depths
    int leftDepth = maxDepth(root.left);
    int rightDepth = maxDepth(root.right);
    
    return 1 + Math.max(leftDepth, rightDepth);
}
      `,
      
      c: `
struct TreeNode {
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
};

int maxDepth(struct TreeNode* root) {
    if (root == NULL) return 0;
    
    int left = maxDepth(root->left);
    int right = maxDepth(root->right);
    
    return 1 + (left > right ? left : right);
}
      `
    },
    
    practice_problems: [
      { title: "Maximum Depth of Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree" },
      { title: "Invert Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/invert-binary-tree" },
      { title: "Validate Binary Search Tree", difficulty: "Medium", link: "https://leetcode.com/problems/validate-binary-search-tree" },
      { title: "Binary Tree Level Order Traversal", difficulty: "Medium", link: "https://leetcode.com/problems/binary-tree-level-order-traversal" },
      { title: "Lowest Common Ancestor", difficulty: "Medium", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree" }
    ]
  },

  {
    slug: "graphs",
    name: "Graphs",
    color: "#f43f5e",
    icon: "Network",
    tagline: "Nodes connected by edges — traverse with BFS or DFS",
    
    what_is_it: `
      A graph is a collection of nodes (vertices) connected by edges. Unlike trees, graphs can have cycles and nodes can connect to any other node.
      
      BFS: explores level by level — best for shortest path.
      DFS: goes as deep as possible first — best for exploring all paths, cycle detection, topological sort.
    `,
    
    when_to_use: `
      Use Graph algorithms when:
      - Problem involves connections or relationships
      - Need shortest path between nodes
      - Need to detect cycles
      - Problem involves islands, regions, or connected components
      - Dependencies need to be ordered (topological sort)
    `,
    
    recognition_signals: [
      "Grid problem with connected cells",
      "Number of islands or connected regions",
      "Shortest path between two points",
      "Course prerequisites (dependency ordering)",
      "Social network connections",
      "Keywords: connected, path, cycle, route"
    ],
    
    decision_tree: [
      {
        question: "Need SHORTEST path?",
        yes: "BFS (unweighted) or Dijkstra (weighted)",
        no: "DFS for exploration/cycle detection"
      },
      {
        question: "Is input a 2D GRID?",
        yes: "Treat each cell as a node, 4 neighbors are edges",
        no: "Build adjacency list from input"
      }
    ],
    
    common_mistakes: [
      "Forgetting to mark nodes as visited → infinite loop",
      "Using DFS when BFS is needed for shortest path",
      "Not building adjacency list correctly for undirected graphs (add both directions)",
      "Stack overflow with recursive DFS on very large graphs"
    ],
    
    complexity: {
      time: "O(V + E) — vertices + edges",
      space: "O(V) — visited set + queue/stack"
    },
    
    code_examples: {
      problem: "Number of Islands — count connected groups of 1s in a grid",
      
      cpp: `
#include <vector>
using namespace std;

void dfs(vector<vector<char>>& grid, 
         int r, int c) {
    // Out of bounds or water or visited
    if (r < 0 || r >= grid.size() || 
        c < 0 || c >= grid[0].size() || 
        grid[r][c] != '1') return;
    
    grid[r][c] = '0'; // Mark as visited
    
    // Explore all 4 directions
    dfs(grid, r+1, c);
    dfs(grid, r-1, c);
    dfs(grid, r, c+1);
    dfs(grid, r, c-1);
}

int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for (int r = 0; r < grid.size(); r++) {
        for (int c = 0; c < grid[0].size(); c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    return count;
}
      `,
      
      python: `
def numIslands(grid: list[list[str]]) -> int:
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        # Out of bounds or water or visited
        if (r < 0 or r >= rows or 
            c < 0 or c >= cols or 
            grid[r][c] != '1'):
            return
        
        grid[r][c] = '0'  # Mark visited
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    
    return count
      `,
      
      java: `
public int numIslands(char[][] grid) {
    int count = 0;
    for (int r = 0; r < grid.length; r++) {
        for (int c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    return count;
}

private void dfs(char[][] grid, int r, int c) {
    if (r < 0 || r >= grid.length || 
        c < 0 || c >= grid[0].length || 
        grid[r][c] != '1') return;
    
    grid[r][c] = '0';
    dfs(grid, r+1, c);
    dfs(grid, r-1, c);
    dfs(grid, r, c+1);
    dfs(grid, r, c-1);
}
      `,
      
      c: `
void dfs(char** grid, int rows, int cols, 
          int r, int c) {
    if (r < 0 || r >= rows || 
        c < 0 || c >= cols || 
        grid[r][c] != '1') return;
    
    grid[r][c] = '0';
    dfs(grid, rows, cols, r+1, c);
    dfs(grid, rows, cols, r-1, c);
    dfs(grid, rows, cols, r, c+1);
    dfs(grid, rows, cols, r, c-1);
}

int numIslands(char** grid, int rows, int cols) {
    int count = 0;
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++)
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, rows, cols, r, c);
            }
    return count;
}
      `
    },
    
    practice_problems: [
      { title: "Number of Islands", difficulty: "Medium", link: "https://leetcode.com/problems/number-of-islands" },
      { title: "Clone Graph", difficulty: "Medium", link: "https://leetcode.com/problems/clone-graph" },
      { title: "Course Schedule", difficulty: "Medium", link: "https://leetcode.com/problems/course-schedule" },
      { title: "Pacific Atlantic Water Flow", difficulty: "Medium", link: "https://leetcode.com/problems/pacific-atlantic-water-flow" },
      { title: "Word Ladder", difficulty: "Hard", link: "https://leetcode.com/problems/word-ladder" }
    ]
  },

  {
    slug: "dynamic-programming",
    name: "Dynamic Programming",
    color: "#f97316",
    icon: "TableProperties",
    tagline: "Break problems into overlapping subproblems and cache the results",
    
    what_is_it: `
      Dynamic Programming solves problems by breaking them into smaller overlapping subproblems, solving each once, and storing the result.
      
      Two approaches:
      Top-down (Memoization): Recursion + cache. Natural to write, easy to understand.
      Bottom-up (Tabulation): Fill a table iteratively. More efficient, no recursion overhead.
      
      The key question: "Can this problem be defined as a function of smaller versions of itself?"
    `,
    
    when_to_use: `
      Use DP when:
      - Problem asks for COUNT of ways to do X
      - Problem asks for MIN or MAX of something
      - Problem has overlapping subproblems (same calculation repeats)
      - Problem has optimal substructure (optimal solution uses optimal sub-solutions)
      - Keywords: longest, shortest, minimum, maximum, count, ways, can you reach
    `,
    
    recognition_signals: [
      "Counting number of ways to reach a goal",
      "Finding minimum cost to reach destination",
      "Longest increasing/common subsequence",
      "Knapsack-style: choose items to maximize value",
      "Problem can be broken into smaller identical subproblems",
      "Recursive solution has repeated subproblems"
    ],
    
    decision_tree: [
      {
        question: "Can I define the answer as f(smaller input)?",
        yes: "Start with recursion, add memoization",
        no: "Reconsider — might not be DP"
      },
      {
        question: "How many variables change between subproblems?",
        one: "1D DP array",
        two: "2D DP table"
      }
    ],
    
    common_mistakes: [
      "Not identifying the right state definition",
      "Wrong base cases — causes incorrect cascade",
      "Forgetting that DP requires overlapping subproblems (not just recursion)",
      "Using DP when Greedy would work (simpler and faster)"
    ],
    
    complexity: {
      time: "O(N) to O(N²) depending on states",
      space: "O(N) to O(N²) for the DP table"
    },
    
    code_examples: {
      problem: "Climbing Stairs — count ways to reach top taking 1 or 2 steps",
      
      cpp: `
#include <vector>
using namespace std;

int climbStairs(int n) {
    if (n <= 2) return n;
    
    // dp[i] = ways to reach step i
    vector<int> dp(n + 1);
    dp[1] = 1; // 1 way to reach step 1
    dp[2] = 2; // 2 ways to reach step 2
    
    for (int i = 3; i <= n; i++) {
        // Came from step i-1 or step i-2
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
      `,
      
      python: `
def climbStairs(n: int) -> int:
    if n <= 2:
        return n
    
    # dp[i] = number of ways to reach step i
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]
      `,
      
      java: `
public int climbStairs(int n) {
    if (n <= 2) return n;
    
    int[] dp = new int[n + 1];
    dp[1] = 1;
    dp[2] = 2;
    
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
      `,
      
      c: `
int climbStairs(int n) {
    if (n <= 2) return n;
    
    int dp[n + 1];
    dp[1] = 1;
    dp[2] = 2;
    
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
      `
    },
    
    practice_problems: [
      { title: "Climbing Stairs", difficulty: "Easy", link: "https://leetcode.com/problems/climbing-stairs" },
      { title: "House Robber", difficulty: "Medium", link: "https://leetcode.com/problems/house-robber" },
      { title: "Longest Common Subsequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-common-subsequence" },
      { title: "Coin Change", difficulty: "Medium", link: "https://leetcode.com/problems/coin-change" },
      { title: "0/1 Knapsack", difficulty: "Medium", link: "https://leetcode.com/problems/partition-equal-subset-sum" }
    ]
  },

  {
    slug: "backtracking",
    name: "Backtracking",
    color: "#ec4899",
    icon: "Undo2",
    tagline: "Explore all possibilities by building and undoing choices",
    
    what_is_it: `
      Backtracking is a systematic way to explore all possible solutions. You make a choice, explore it fully, then UNDO it (backtrack) and try the next choice.
      
      Think of it as a decision tree — you explore every branch, but prune branches early when you know they can't lead to a valid solution.
      
      Template:
      choose → explore → unchoose
    `,
    
    when_to_use: `
      Use Backtracking when:
      - Need to generate ALL combinations or permutations
      - Need to find ALL valid arrangements
      - Problem involves making sequential choices
      - Need to solve constraint satisfaction problems
      - Keywords: all combinations, all permutations, generate all, find all valid
    `,
    
    recognition_signals: [
      "Generate all subsets or combinations",
      "Generate all permutations of input",
      "Solve a puzzle (Sudoku, N-Queens)",
      "Find all valid paths in a maze",
      "Word search in a grid",
      "Problem requires exploring all possibilities"
    ],
    
    decision_tree: [
      {
        question: "Need ALL solutions or just ONE?",
        all: "Backtracking — explore everything",
        one: "Consider BFS/DFS which stops at first"
      },
      {
        question: "Can I prune invalid branches early?",
        yes: "Add constraint check before recursing",
        no: "Pure backtracking, explore all"
      }
    ],
    
    common_mistakes: [
      "Forgetting to UNDO the choice after recursion",
      "Not adding pruning conditions — causes TLE on large inputs",
      "Modifying the input directly without restoring it",
      "Confusing backtracking with DP — backtracking explores all, DP caches"
    ],
    
    complexity: {
      time: "O(N!) for permutations, O(2^N) for subsets",
      space: "O(N) recursion depth"
    },
    
    code_examples: {
      problem: "Generate all subsets of an array",
      
      cpp: `
#include <vector>
using namespace std;

void backtrack(vector<int>& nums, int start,
               vector<int>& current,
               vector<vector<int>>& result) {
    // Add current subset to result
    result.push_back(current);
    
    for (int i = start; i < nums.size(); i++) {
        current.push_back(nums[i]);  // Choose
        backtrack(nums, i+1, current, result); // Explore
        current.pop_back();          // Unchoose
    }
}

vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    backtrack(nums, 0, current, result);
    return result;
}
      `,
      
      python: `
def subsets(nums: list[int]) -> list[list[int]]:
    result = []
    
    def backtrack(start, current):
        result.append(current[:])  # Add copy
        
        for i in range(start, len(nums)):
            current.append(nums[i])    # Choose
            backtrack(i + 1, current)  # Explore
            current.pop()              # Unchoose
    
    backtrack(0, [])
    return result
      `,
      
      java: `
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int start,
                        List<Integer> current,
                        List<List<Integer>> result) {
    result.add(new ArrayList<>(current));
    
    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);          // Choose
        backtrack(nums, i+1, current, result); // Explore
        current.remove(current.size()-1); // Unchoose
    }
}
      `,
      
      c: `
void backtrack(int* nums, int n, int start,
               int* current, int currSize,
               int** result, int* returnSize) {
    // Copy current to result
    result[*returnSize] = malloc(currSize * sizeof(int));
    memcpy(result[*returnSize], current, 
           currSize * sizeof(int));
    (*returnSize)++;
    
    for (int i = start; i < n; i++) {
        current[currSize] = nums[i]; // Choose
        backtrack(nums, n, i+1, current, 
                  currSize+1, result, returnSize);
        // Unchoose: just decrement size next call
    }
}
      `
    },
    
    practice_problems: [
      { title: "Subsets", difficulty: "Medium", link: "https://leetcode.com/problems/subsets" },
      { title: "Permutations", difficulty: "Medium", link: "https://leetcode.com/problems/permutations" },
      { title: "Combination Sum", difficulty: "Medium", link: "https://leetcode.com/problems/combination-sum" },
      { title: "Word Search", difficulty: "Medium", link: "https://leetcode.com/problems/word-search" },
      { title: "N-Queens", difficulty: "Hard", link: "https://leetcode.com/problems/n-queens" }
    ]
  }
];
