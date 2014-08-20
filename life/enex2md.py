from lxml import etree
from StringIO import StringIO

p = etree.XMLParser(remove_blank_text=True, resolve_entities=False)
def parse_note(xmlFile):
    context = etree.iterparse(xmlFile, encoding='utf-8', strip_cdata=False)
    note_dict = {}
    notes = []
    for ind, (action, elem) in enumerate(context):
        text = elem.text
        if elem.tag == 'content':
            text = []
            r = etree.parse(StringIO(elem.text.encode('utf-8')), p)
            for e in r.iter():
                try:
                    text.append(e.text)
                except:
                    print 'cannot print'
        note_dict[elem.tag] = text
        if elem.tag == "note":
            notes.append(note_dict)
            note_dict = {}
    return notes
 
def convert_to_mds(notes, debug=False):
    fmt_fn = '%s-%s-%s-%s'
    fmt_cnt = '''---
layout: post
title: %s
---
'''
    mds = []
    for note in notes:
        ctime = note['created']
        ctitle = note['title']
        fn = fmt_fn % (ctime[0:4], ctime[4:6], ctime[6:8], \
            ctitle.replace(' ', '-'))
        fn = fn.lower()
        if fn[-1] == '.':
            fn = fn + 'md'
        else:
            fn = fn + '.md'
        cnt = fmt_cnt % (ctitle)#, notes[0]['content'])
        mds.append(cnt)

        if not debug:
            with open(fn, 'w') as md:
                md.write(cnt)

    return mds

if __name__ == '__main__':
    notes = parse_note('My Notes.enex')
    print notes
    print convert_to_mds(notes)