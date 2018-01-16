from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from multiselectfield import MultiSelectField

SIZE_CHOICES = (
    ('Tiny', 'Tiny'),
    ('Small', 'Small'),
    ('Medium', 'Medium'),
    ('Large', 'Large'),
)

TYPE_CHOICES = (
    ('Humanoid', 'Humanoid'),
)

ALIGNMENT = (
    ('Lawful Good', 'Lawful Good'),
    ('Neutral Good', 'Neutral Good'),
    ('Chaotic Good', 'Chaotic Good'),
    ('Lawful Neutral', 'Lawful Neutral'),
    ('True Neutral', 'True Neutral'),
    ('Chaotic Neutral', 'Chaotic Neutral'),
    ('Lawful Evil', 'Lawful Evil'),
    ('Neutral Evil', 'Neutral Evil'),
    ('Chaotic Evil', 'Chaotic Evil'),
)

SUBTYPE_CHOICES = (
    ('Android', 'Android'),
    ('Human', 'Human'),
    ('Kasatha', 'Kasatha'),
    ('Lashunta', 'Lashunta'),
    ('Shirren', 'Shirren'),
    ('Vesk', 'Vesk'),
    ('Ysoki', 'Ysoki'),
    ('Verthani', 'Verthani'),
)

ARMOR_PROFICIENCIES = (
    ('Light Armor', 'Light Armor'),
    ('Heavy Armor', 'Heavy Armor'),
    ('Powered Armor', 'Powered Armor'),
)

WEAPON_PROFICIENCIES = (
    ('Basic Melee', 'Basic Melee'),
    ('Advanced Melee', 'Advanced Melee'),
    ('Small Arms', 'Small Arms'),
    ('Large Arms', 'Longarms'),
    ('Heavy Weapons', 'Heavy Weapons'),
    ('Sniper Weapons', 'Sniper Weapons'),
    ('Grenades', 'Grenades'),
)

CLASS_BONUSES = (
    ('High', 'High'),
    ('Low', 'Low'),
)

ABILITIES = (
    ('Str', 'Strength'),
    ('Dex', 'Dexterity'),
    ('Con', 'Constitution'),
    ('Int', 'Intelligence'),
    ('Wis', 'Wisdom'),
    ('Cha', 'Charisma'),
)

SKILLS = (
    ('Acrobatics', 'Acrobatics'),
    ('Athletics', 'Athletics'),
    ('Bluff', 'Bluff'),
    ('Computers', 'Computers'),
    ('Culture', 'Culture'),
    ('Diplomacy', 'Diplomacy'),
    ('Disguise', 'Disguise'),
    ('Engineering', 'Engineering'),
    ('Intimidate', 'Intimidate'),
    ('Life Science', 'Life Science'),
    ('Medicine', 'Medicine'),
    ('Mysticism', 'Mysticism'),
    ('Perception', 'Perception'),
    ('Physical Science', 'Physical Science'),
    ('Piloting', 'Piloting'),
    ('Profession', 'Profession'),
    ('Sense Motive', 'Sense Motive'),
    ('Sleight of Hand', 'Sleight of Hand'),
    ('Stealth', 'Stealth'),
    ('Survival', 'Survival'),
)


class Feature(models.Model):
    name = models.CharField(
        max_length=150,
        verbose_name='Name',
        name='name'
    )
    description = models.TextField(
        verbose_name='Description',
    )
    level = models.PositiveIntegerField(
        default=1,
        verbose_name='Level Requirement',
        validators=[
            MinValueValidator(1),
        ]
    )

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(
        max_length=150,
        verbose_name='Name',
        name='name'
    )
    ability = MultiSelectField(
        max_length=25,
        verbose_name='Ability',
        choices=ABILITIES,
    )
    ap = models.BooleanField(
        default=False,
        verbose_name='Armor Check Penalty',
    )
    training = models.BooleanField(
        default=False,
        verbose_name='Untrained?',
    )

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Race(models.Model):
    name = models.CharField(
        max_length=150,
        verbose_name='Name',
        name='name'
    )
    strength = models.IntegerField(
        verbose_name='Strength',
        default=0,
    )
    dexterity = models.IntegerField(
        verbose_name='Dexterity',
        default=0,
    )
    constitution = models.IntegerField(
        verbose_name='Constitution',
        default=0,
    )
    intelligence = models.IntegerField(
        verbose_name='Intelligence',
        default=0,
    )
    wisdom = models.IntegerField(
        verbose_name='Wisdom',
        default=0,
    )
    charisma = models.IntegerField(
        verbose_name='Charisma',
        default=0,
    )
    hit_points = models.PositiveIntegerField(
        verbose_name='Hit Points',
        default=0,
    )
    size = models.CharField(
        max_length=15,
        verbose_name='Size',
        choices=SIZE_CHOICES,
    )
    type = models.CharField(
        max_length=15,
        verbose_name='Type',
        choices=TYPE_CHOICES,
    )
    subtype = models.CharField(
        max_length=15,
        verbose_name='Subtype',
        choices=SUBTYPE_CHOICES,
    )
    initial_description = models.TextField(
        verbose_name='Initial Description',
        blank=True,
        null=True,
    )
    physical_description = models.TextField(
        verbose_name='Physical Description',
        blank=True,
        null=True,
    )
    homeworld = models.TextField(
        verbose_name='Home World',
        blank=True,
        null=True,
    )
    society_alignment = models.TextField(
        verbose_name='Society and Alignment',
        blank=True,
        null=True,
    )
    relations = models.TextField(
        verbose_name='Relations',
        blank=True,
        null=True,
    )
    adventurers = models.TextField(
        verbose_name='Adventurers',
        blank=True,
        null=True,
    )
    names = models.TextField(
        verbose_name='Names',
        blank=True,
        null=True,
    )
    first_racial_feature = models.ForeignKey(
        Feature,
        on_delete=models.CASCADE,
        related_name="race_feature_one",
        blank=True,
        null=True,
    )
    second_racial_feature = models.ForeignKey(
        Feature,
        on_delete=models.CASCADE,
        related_name="race_feature_two",
        blank=True,
        null=True,
    )
    third_racial_feature = models.ForeignKey(
        Feature,
        on_delete=models.CASCADE,
        related_name="race_feature_three",
        blank=True,
        null=True,
    )
    fourth_racial_feature = models.ForeignKey(
        Feature,
        on_delete=models.CASCADE,
        related_name="race_feature_four",
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name


class Theme(models.Model):
    name = models.CharField(
        max_length=150,
        verbose_name='Theme Name',
        name='name',
    )
    description = models.TextField(
        verbose_name='Description',
        blank=True,
        null=True,
    )
    strength = models.IntegerField(
        verbose_name='Strength',
        default=0,
    )
    dexterity = models.IntegerField(
        verbose_name='Dexterity',
        default=0,
    )
    constitution = models.IntegerField(
        verbose_name='Constitution',
        default=0,
    )
    intelligence = models.IntegerField(
        verbose_name='Intelligence',
        default=0,
    )
    wisdom = models.IntegerField(
        verbose_name='Wisdom',
        default=0,
    )
    charisma = models.IntegerField(
        verbose_name='Charisma',
        default=0,
    )
    first_theme_feature = models.ForeignKey(
        Feature,
        on_delete=models.CASCADE,
        related_name="theme_feature_one",
        blank=True,
        null=True,
    )
    second_theme_feature = models.ForeignKey(
        Feature,
        on_delete=models.CASCADE,
        related_name="theme_feature_two",
        blank=True,
        null=True,
    )
    third_theme_feature = models.ForeignKey(
        Feature,
        on_delete=models.CASCADE,
        related_name="theme_feature_three",
        blank=True,
        null=True,
    )
    fourth_theme_feature = models.ForeignKey(
        Feature,
        on_delete=models.CASCADE,
        related_name="theme_feature_four",
        blank=True,
        null=True,
    )

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class CharacterClass(models.Model):
    name = models.CharField(
        max_length=150,
        verbose_name='Name',
        name='name',
    )
    description = models.TextField(
        verbose_name='Description',
        blank=True,
        null=True,
    )
    hit_points = models.PositiveIntegerField(
        verbose_name='Hit Points',
        default=0,
    )
    stamina = models.PositiveIntegerField(
        verbose_name='Stamina Points',
        default=0,
    )
    skill_ranks = models.PositiveIntegerField(
        verbose_name='Skill Ranks Per Level',
        default=0
    )
    armor = MultiSelectField(
        verbose_name='Armor Proficiencies',
        max_length=150,
        choices=ARMOR_PROFICIENCIES,
    )
    weapon = MultiSelectField(
        verbose_name='Weapon Proficiencies',
        max_length=150,
        choices=WEAPON_PROFICIENCIES,
    )
    bab = models.CharField(
        verbose_name='Base Attack Bonus',
        max_length=150,
        choices=CLASS_BONUSES,
    )
    fort = models.CharField(
        verbose_name='Fortitude Save',
        max_length=25,
        choices=CLASS_BONUSES,
    )
    ref = models.CharField(
        verbose_name='Reflex Save',
        max_length=25,
        choices=CLASS_BONUSES,
    )
    will = models.CharField(
        verbose_name='Willpower Save',
        max_length=25,
        choices=CLASS_BONUSES,
    )
    skills = MultiSelectField(
        verbose_name='Class Skills',
        choices=SKILLS,
    )

    def __str__(self):
        return self.name


class Character(models.Model):
    name = models.CharField(
        max_length=150,
        verbose_name='Name',
        name='name'
    )
    gender = models.CharField(
        max_length=150,
        verbose_name='Gender',
        blank=True,
    )
    age = models.CharField(
        max_length=1500,
        verbose_name='Age',
        blank=True,
    )
    height = models.PositiveIntegerField(
        verbose_name='Height',
        blank=True,
    )
    weight = models.PositiveIntegerField(
        verbose_name='Weight',
        blank=True,
    )
    hair_color = models.CharField(
        max_length=150,
        verbose_name='Hair Color',
        blank=True
    )
    eye_color = models.CharField(
        max_length=150,
        verbose_name='Eye Color',
        blank=True
    )
    description = models.TextField(
        verbose_name='Description',
        blank=True,
    )
    alignment = models.CharField(
        max_length=150,
        choices=ALIGNMENT,
    )
    strength = models.IntegerField(
        verbose_name='Strength',
        default=10,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(18),
        ]
    )
    dexterity = models.IntegerField(
        verbose_name='Dexterity',
        default=10,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(18),
        ]
    )
    constitution = models.IntegerField(
        verbose_name='Constitution',
        default=10,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(18),
        ]
    )
    intelligence = models.IntegerField(
        verbose_name='Intelligence',
        default=10,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(18),
        ]
    )
    wisdom = models.IntegerField(
        verbose_name='Wisdom',
        default=10,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(18),
        ]
    )
    charisma = models.IntegerField(
        verbose_name='Charisma',
        default=10,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(18),
        ]
    )
    race = models.ForeignKey(
        Race,
        on_delete=models.CASCADE,
        related_name='race',
    )
    theme = models.ForeignKey(
        Theme,
        on_delete=models.CASCADE,
        related_name='theme',
    )
    character_class = models.ForeignKey(
        CharacterClass,
        on_delete=models.CASCADE,
        related_name='character_class',
        null=True,
    )

    def __str__(self):
        return self.name
