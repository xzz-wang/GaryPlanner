from __future__ import annotations

from typing import List

from ..setup import db

from enum import Enum


'''
    @author: Jiazheng Liu

    FIXME: We need to consider the classes that have been existing but ceases to exist
'''

# FIXME: I suggest to store all the Enum in one file and import that file everywhere needed
class GradeType(Enum):
    PNP_Only = 0
    Letter_Only = 1
    Both = 2

class AllClass(db.Model):
    __tablename__ = "AllClasses"

    id = db.Column(db.Integer, primary_key=True)
    class_code = db.Column(db.String(255), unique = True, nullable=False)
    title = db.Column(db.String(255), nullable=False) # FIXME: idk if this should be unique or not
    units = db.Column(db.Integer, nullable=False)
    support_grade_type = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(2047), nullable=False)
    prerequisites = db.Column(db.String(255), nullable=False)

    def __init__(self, **kwargs):
        super(AllClass, self).__init__(**kwargs)

    def to_json(self):
        ret = {}
        ret['id'] = self.id
        ret['class_code'] = self.class_code
        ret['title'] = self.title
        ret['units'] = self.units
        ret['support_grade_type'] = GradeType(self.support_grade_type).name
        ret['description'] = self.description
        ret['prerequisites'] = self.prerequisites
        return ret

    def update_attr(self, class_code: str, title: str, units: int, support_grade_type: int, description: str, prerequisites: str) -> bool:
        '''
        update the info
        input   self-explanatory
        output  True
        @author: Jiazheng Liu
        '''
        if class_code:
            self.class_code = class_code
        if title:
            self.title = title
        if units:
            self.units = units
        if support_grade_type:
            self.support_grade_type = GradeType[support_grade_type].value
        if description:
            self.description = description
        if prerequisites:
            self.prerequisites = prerequisites
        self.save()
        return True, self

    def save(self):
        db.session.commit()

    @staticmethod
    def create_class(class_code: str, title: str, units: int, support_grade_type: int, description: str, prerequisites: str) -> bool:
        '''
        create prereq
        input   self-explanatory
        output  True if class successfully created
                False if class existed already
        @author: Jiazheng Liu
        '''
        # This is a pre done thing before the app goes public
        if AllClass.get_class_by_code(class_code=class_code):
            return False, None    # class with prereq exists
        clss = AllClass(class_code=class_code, title = title, units = units, support_grade_type = GradeType[support_grade_type].value, description = description, prerequisites = prerequisites)
        db.session.add(clss)
        clss.save()
        return True, clss

    @staticmethod
    def get_classes() -> List[AllClass]:
        '''
        get all classes
        input   None
        output  classes in JSON
        @author: Jiazheng Liu
        '''
        return AllClass.query.all()

    @staticmethod
    def get_class_by_code(class_code: str) -> User:
        '''
        get a class
        input   class_code(str)
        output  info of that class
        @author: Jiazheng Liu
        '''
        return AllClass.query.filter_by(class_code=class_code).first()

    @staticmethod
    def update_class(class_code: str, title: str, units: int, support_grade_type: int, description: str, prerequisites: str) -> bool:
        '''
        update prereq for a class
        input   self-explanatory
        output  True if class updated successfully,
                False if class does not exist
        @author: Jiazheng Liu
        '''
        # TODO: Maybe we want to use **kwargs, but maybe not...
        clss = AllClass.get_class_by_code(class_code=class_code)
        if clss:
            return clss.update_attr(class_code=class_code, title = title, units = units, support_grade_type = support_grade_type, description = description, prerequisites = prerequisites)
        return False, None
