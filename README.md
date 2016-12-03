**
COMPSCI311-SEC01:
Introduction to Algorithms Fall 2016
Due: December 2, 2016
**

# LRS Algorithm Overview

###### (a) Intuition for algorithm
Motivation: The approach to solving the LRS problem relies on the design and implementation of a suffix array and the usage of suffix sorting. Suffix sorting sorts the suffixes of a given string in ascending order. The resulting sorted list is called a suffix array.

The polynomial time LRS algorithm leverages this suffix array data structure to efficiently ascertain the longest repeated substring of a given string. The algorithms public interface is purposefully rather simple. The algorithm accepts an input string of n length. From here, the algorithm constructs a suffix array based on the given string x.

Given the construction of a suffix array, the LRS algorithm leverages the underlying sorted data structure. The LRS algorithm proceeds to solve sub-problems of the longest common prefix by:
1.	sequentially walking through the sequence
2.	returning the length of the current LCP found using SuffixArray[i] and SuffixArray[i - 1].
If the length of the current LCP is greater than the current LRS, we update LRS to be substring found at the indices of LCP. We repeat this process until our iterative step becomes greater than n.

###### (b) High-level pseudocode.
LRS( s ) :=

      n <-- length of string s
      SA <-- return a newly constructed suffix array using s
      LRS <-- init the solution string

         FOR i <-- n; DO:
            length <-- k // computes the longest common prefix

            IF length is greater than LRS's length; DO:
               LRS <-- the new substring found at the index of the currently computed LCP

            ENDIF
         ENDFOR

      RETURN LRS




###### (c) Run-time analysis.
The time complexity to walk through all suffixes in our suffix array is linear. The time complexity to build the suffix array is O(n^2(logn)) if we consider an O(nlogn) algorithm used for sorting. The sorting step itself takes O(n^2(logn)) time as every comparison is a comparison of two strings and the comparison takes O(n) time. Therefore, the algorithm’s time complexity is O(n^2), or simply O(n^2).

Author: Philron Hozier
=======
# LRS algorithm
Time complexity: O(n^2)

returns the (computed) longest repeated substring to stdout
