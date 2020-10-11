from django.db import models

from markdownx.models import MarkdownxField
import markdown

stopWords = [
    "#", "##", "a", "about", "above", "after", "again", "against", "all", "am",
    "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been",
    "before", "being", "below", "between", "both", "but", "by", "can't", "cannot",
    "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't",
    "down", "during", "each", "few", "for", "from", "further", "had", "hadn't",
    "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's",
    "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how",
    "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't",
    "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my",
    "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other",
    "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she",
    "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that",
    "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's",
    "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through",
    "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll",
    "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where",
    "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't",
    "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours",
    "yourself", "yourselves"
]


class Post(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    slug = models.CharField(max_length=100)
    content =  MarkdownxField()

    def __str__(self):
        return self.title

    def formatted_markdown(self):
        md = markdown.Markdown()
        return md.convert(self.content)

    @property
    def tags(self):
        '''
        Get the most common tags used in the post contents
        '''
        words_dict = self.get_contents_as_dict()
        tags = self.get_taggable_words(words_dict)
        return ', '.join(tags)

    def get_contents_as_dict(self):
        '''
        Return a dictionary containing
         - Key = word
         - Value = the number of times that word appears in self.content
         {
             'as': 5
         }
        '''
        words = {}
        for word in self.content.split(' '):
            words[word] = words.get(word, 0) + 1
        return words

    def get_taggable_words(self, word_dict):
        taggable = {}
        for word in stopWords:
            if word_dict.get(word):
                taggable[word] = word_dict.get(word)
        sorted_tags = {k: v for k, v in sorted(taggable.items(), key=lambda item: item[1], reverse=True)}
        tags = []
        for key, value in sorted_tags.items():
            tags.append(key)
        return tags[0:5]
