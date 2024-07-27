const propertiesData = [
    {
        id: 'P31',
        label: 'instance of',
        description: 'that class of which this subject is a particular example and member; different from P279 (subclass of); for example: K2 is an instance of mountain; volcano is a subclass of mountain (and an instance of volcanic landform)'
    },
    {
        id: 'P279',
        label: 'subclass',
        description: 'this item is a subclass (subset) of that item; all instances of this item are instances of that item; different from P31 (instance of), e.g.: K2 is an instance of mountain; volcano is a subclass of mountain (and an instance of volcanic landform)'
    },
    {
        id: 'P361',
        label: 'part of',
        description: 'object of which the subject is a part (if this subject is already part of object A which is a part of object B, then please only make the subject part of object A), inverse property of "has part" (P527, see also "has parts of the class" (P2670))'
    },
    {
        id: 'P527',
        label: 'has part',
        description: 'part of this subject; inverse property of "part of" (P361). See also "has parts of the class" (P2670).'
    },
    {
        id: 'P4330',
        label: 'contains',
        description: 'item or substance located within this item but not part of it'
    }
];

module.exports = {propertiesData}