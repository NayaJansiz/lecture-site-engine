# المحاضرة 10 — مشروع تعلم الآلة: التنبؤ بالناجين من تايتانيك

> **المادة:** البرمجة المتقدمة 2 (القسم النظري) | **الموضوع:** `Machine Learning Project` — تحليل بيانات تايتانيك وبناء نموذج تنبؤي | **الدكتور:** م. رجب

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| 1 — استيراد البيانات | `pandas`, `numpy` | `DataFrame` جاهز للتحليل |
| 2 — استكشاف البيانات (EDA) | `df.describe()`, `df.isnull()` | فهم البنية والقيم المفقودة |
| 3 — التحليل والتصوير | `seaborn`, `matplotlib` | مخططات تكشف العلاقات |
| 4 — هندسة الميزات | `lambda`, `pd.cut()`, `LabelEncoder` | بيانات جاهزة للنمذجة |
| 5 — النمذجة والتقييم ← **أنت هنا** | `sklearn`, `LogisticRegression`, `SVC`, `KNN` | دقة التنبؤ لكل نموذج |

> **نوع هذه المحاضرة:** `Machine Learning` تطبيقي كامل — من البيانات الخام إلى نموذج تنبؤي مقيَّم.

---

## الجزء الأول: الشرح التفصيلي

### 1. مقدمة المشروع (Introduction)

#### النص الأصلي يقول:
> "We are going to go through the popular Titanic dataset and try to predict whether a person survived the shipwreck. You can get this dataset from Kaggle. The Goal: Predict whether a passenger survived or not. 0 for not surviving, 1 for surviving."

#### الشرح المبسّط:
مشروع `Titanic` هو أشهر مشروع تمهيدي في `Machine Learning`. يحتوي الـ `dataset` على معلومات عن ركاب السفينة (العمر، الجنس، الدرجة، السعر…) والمهمة هي: هل نجا هذا الراكب أم لا؟

**لماذا؟** لأن مسألة التنبؤ بقيمة ثنائية (نعم/لا — 0/1) تُسمى `Binary Classification`، وهي أبسط أنواع `Supervised Learning`.

💡 **التشبيه:**
> تخيّل أن عندك قاعدة بيانات لمرضى المستشفى، وتريد أن تتنبأ: هل سيتعافى المريض أم لا؟ هذا بالضبط نفس المنطق.
> **وجه الشبه:** راكب التايتانيك = المريض، نجا/لم ينجُ = تعافى/توفي.

#### مهم للامتحان ⚠️:
> قيمة `0` تعني **لم ينجُ** وقيمة `1` تعني **نجا**. هذا هو العمود المستهدف (`target variable`).

---

### 2. تقسيم البيانات: `titanic_train` و `titanic_test`

#### النص الأصلي يقول:
> الجدول الأول `Titanic_train` يحتوي `891 x 12` والجدول الثاني `titanic_test` يحتوي `418 x 12`.

#### الشرح المبسّط:
في `Machine Learning`، نقسم البيانات دائماً إلى مجموعتين:
- **`Training set`**: البيانات التي يتعلم منها النموذج (891 صفاً).
- **`Test set`**: البيانات التي نختبر عليها دقة النموذج (418 صفاً).

**لماذا؟** إذا اختبرنا النموذج على نفس البيانات التي تعلّم منها، ستكون دقته مصطنعة. نريد أن نعرف كيف يؤدي على بيانات **لم يرها من قبل**.

💡 **التشبيه:**
> `Training set` = دراسة الكتاب المقرر. `Test set` = امتحان أسئلة لم تراها من قبل. الهدف هو قدرة التعميم، لا الحفظ.
> **وجه الشبه:** النموذج = الطالب، `Training set` = مادة الدراسة، `Test set` = ورقة الامتحان.

#### 💻 الكود: استيراد البيانات وعرضها

#### ما هذا الكود؟
> يقرأ ملف `CSV` الخاص بالتدريب والاختبار ويعرض أول 15 صفاً.

```python
import pandas as pd         # import pandas for data manipulation
import numpy as np          # import numpy for numerical operations
import matplotlib.pyplot as plt   # import matplotlib for plotting
import seaborn as sns       # import seaborn for statistical visualization

# Read the full combined dataset
tt = pd.read_csv('d:/datasets/titanic.csv')
tt  # display the DataFrame

# Read separate train and test datasets
titanic_train = pd.read_csv('d:/datasets/titanic_train.csv')
print(titanic_train.shape)           # print shape (rows, columns)
titanic_train.head(15)               # show first 15 rows

titanic_test = pd.read_csv('d:/datasets/titanic_test.csv')
print(titanic_test.shape)            # print shape (rows, columns)
titanic_test.tail(10)                # show last 10 rows
```

#### شرح كل سطر:
1. `import pandas as pd` → تحميل مكتبة `pandas` بالاسم المختصر `pd` — لأنها ستُستخدم كثيراً.
2. `import numpy as np` → تحميل `numpy` للعمليات الرياضية على المصفوفات.
3. `import matplotlib.pyplot as plt` → تحميل `matplotlib` لرسم المخططات.
4. `import seaborn as sns` → تحميل `seaborn` للمخططات الإحصائية الجميلة.
5. `tt = pd.read_csv(...)` → قراءة ملف `CSV` وتخزينه كـ `DataFrame`.
6. `titanic_train.shape` → يُرجع `(891, 12)` — 891 صفاً و12 عموداً.
7. `.head(15)` → عرض أول 15 صفاً فقط للاستطلاع.
8. `.tail(10)` → عرض آخر 10 صفوف.

**المكتبات المطلوبة (Imports):**
> `pandas`, `numpy`, `matplotlib.pyplot`, `seaborn`

**الناتج المتوقع (لقطة الشاشة):**
> جدول يحتوي أعمدة: `PassengerId`, `Survived`, `Pclass`, `Name`, `Sex`, `Age`, `SibSp`, `Parch`, `Ticket`, `Fare`, `Cabin`, `Embarked`

---

### 3. استكشاف البيانات (Titanic Data Analysis)

#### 3.1 وصف البيانات الإحصائي باستخدام `describe()`

#### النص الأصلي يقول:
> `tt.describe()` — يُظهر إحصاءات للأعمدة الرقمية. `tt.describe(include=['O'])` — يُظهر إحصاءات للأعمدة النصية.

#### الشرح المبسّط:
`DataFrame.describe()` يعطيك ملخصاً إحصائياً بلمسة واحدة: عدد القيم، المتوسط، الانحراف المعياري، القيم الدنيا والعليا، والربيعيات.

#### 📐 المعادلة: الانحراف المعياري (Standard Deviation)

$$
\sigma = \sqrt{\frac{\sum (x - \bar{x})^2}{n-1}}
$$

**الشرح:**
> - `σ` = الانحراف المعياري (`std`) — قياس تشتّت البيانات حول المتوسط.
> - `x` = كل قيمة فردية في البيانات.
> - `x̄` = المتوسط الحسابي (`mean`).
> - `n` = عدد القيم.
> - نقسم على `(n-1)` وليس `n` لأننا نحسب من **عينة** وليس المجتمع الكامل (تصحيح بيسل).

#### 📐 المعادلة: الربيعيات (Quartiles)

**الشرح من المحاضرة:**
> يجب ترتيب البيانات أولاً قبل حساب الربيعيات.
> - `Q1` (الربيعي الأول) = `(1+446)/2` → وسيط = 223.5
> - `Q2` (الوسيط — الربيعي الثاني) = `(1+891)/2` → وسيط = 446
> - `Q3` (الربيعي الثالث) = `(446+891)/2` → وسيط = 668.5

#### 💻 الكود: وصف البيانات

#### ما هذا الكود؟
> يستعرض إحصاءات وصفية للأعمدة الرقمية والنصية، ويحسب القيم المفقودة.

```python
# Descriptive statistics for numeric columns
tt.describe()

# Descriptive statistics for object (text) columns
tt.describe(include=['O'])

# Sum of all values per column (to inspect data totals)
titanic_train.sum()

# Count missing (null) values per column
titanic_train.isnull().sum()
```

#### شرح كل سطر:
1. `tt.describe()` → يُرجع: `count`, `mean`, `std`, `min`, `25%`, `50%`, `75%`, `max` لكل عمود رقمي.
2. `tt.describe(include=['O'])` → يُرجع: `count`, `unique`, `top`, `freq` للأعمدة النصية (`object`).
3. `titanic_train.sum()` → يجمع القيم — مفيد للكشف عن التسلسل وإجمالي الناجين.
4. `.isnull().sum()` → يعدّ القيم المفقودة في كل عمود — ضروري قبل أي معالجة.

**الناتج المتوقع:**
> - `Age` → 177 قيمة مفقودة في `train`.
> - `Cabin` → 687 قيمة مفقودة في `train`.
> - `Embarked` → 2 قيمتان مفقودتان في `train`.

#### مهم للامتحان ⚠️:
> القيم المفقودة في `Age` و`Cabin` تحتاج معالجة قبل التدريب. تجاهلها يؤثر سلباً على النموذج.

---

### 4. العلاقة بين الميزات والبقاء (Relationship between Features and Survival)

#### النص الأصلي يقول:
> "In this section, we analyze relationship between different features with respect to Survival. We see how different feature values show different survival chance."

#### الشرح المبسّط:
قبل بناء النموذج، نحتاج أن نفهم: هل يؤثر الجنس على احتمالية النجاة؟ هل تؤثر درجة السفر؟ هذا يسمى `Exploratory Data Analysis (EDA)`.

#### 4.1 درجة التذكرة (`Pclass`) مقابل البقاء

#### النص الأصلي يقول:
> الناتج: من الدرجة الأولى `Pclass=1`: نجا 136 من 216 = 62.96%. الدرجة الثانية: 87/184 = 47.28%. الدرجة الثالثة: 119/491 = 24.23%.

**الشرطة القصيرة في المخطط تعني أن البيانات مستقرة ودقيقة** (انحراف معياري منخفض حول المتوسط).

#### 💻 الكود: تحليل `Pclass` مقابل البقاء

#### ما هذا الكود؟
> يحسب عدد الناجين وغير الناجين ثم يرسم `barplot` لمقارنة الدرجات.

```python
# Count survived and not survived passengers
survived = titanic_train[titanic_train['Survived'] == 1]          # filter survived
not_survived = titanic_train[titanic_train['Survived'] == 0]      # filter not survived

# Print counts and percentages
print("Survived: %i (%.1f%%)" % (len(survived), float(len(survived))/len(titanic_train)*100.0))
print("Not Survived: %i (%.1f%%)" % (len(not_survived), float(len(not_survived))/len(titanic_train)*100.0))
print("Total: %i" % len(titanic_train))

# Count passengers per class
titanic_train.Pclass.value_counts()

# Count survived per class using groupby
titanic_train.groupby('Pclass').Survived.value_counts()

# Bar plot: Pclass vs Survival rate
sns.barplot(x='Pclass', y='Survived', data=titanic_train)
```

#### شرح كل سطر:
1. `titanic_train[titanic_train['Survived'] == 1]` → `Boolean Indexing` — يصفّي الصفوف حيث `Survived = 1`.
2. `float(len(survived))/len(titanic_train)*100.0` → حساب النسبة المئوية للناجين.
3. `.value_counts()` → يعدّ تكرار كل قيمة في العمود.
4. `.groupby('Pclass').Survived.value_counts()` → تجميع حسب `Pclass` ثم عدّ الناجين وغير الناجين.
5. `sns.barplot(x='Pclass', y='Survived', data=titanic_train)` → يرسم متوسط `Survived` لكل `Pclass` مع فترة ثقة.

**الناتج المتوقع:**
> - Survived: 342 (38.4%)
> - Not Survived: 549 (61.6%)
> - Total: 891

#### 🖼️ وصف الشاشة: مخطط `Pclass` مقابل البقاء (صفحة 15)

> **الصفحة/الشريحة:** 15
> **ملاحظة:** لا يمكن عرض لقطة الشاشة في الموقع — الوصف التالي يغطي كل عنصر.

| العنصر | الموقع | الوظيفة |
| --- | --- | --- |
| المحور X | أسفل المخطط | `Pclass` (1, 2, 3) |
| المحور Y | يمين المخطط | `Survived` (0.0 → 0.7) |
| الأعمدة | ثلاثة ألوان | أزرق (1)، برتقالي (2)، أخضر (3) |
| الشريط العمودي | أعلى كل عمود | يمثّل فترة الثقة (`confidence interval`) |

**خطوات العمل:**
1. العمود الأول (أزرق): يصل إلى 0.63 — الدرجة الأولى أعلى نجاة.
2. العمود الثاني (برتقالي): يصل إلى 0.47 — الدرجة الثانية متوسطة.
3. العمود الثالث (أخضر): يصل إلى 0.24 — الدرجة الثالثة أقل نجاة.

#### 4.2 الجنس (`Sex`) مقابل البقاء

#### النص الأصلي يقول:
> "Females have better survival chance. Because survived is (0,1), mean calculates percentage of survived in each group."
> نتيجة: female = 0.742 (74.2%)، male = 0.188 (18.8%)

#### الشرح المبسّط:
عندما نحسب `mean()` لعمود يحتوي فقط `0` و `1`، فإن الناتج يساوي **نسبة الـ 1** مباشرة. هذا يعني: إذا كانت `mean = 0.742`، فـ 74.2% من الإناث نجَوْن.

**لماذا؟** لأن `mean = (عدد الـ 1) / (إجمالي القيم)`.

💡 **التشبيه:**
> إذا عندك قائمة فيها أصفار وواحدات، ومتوسطها 0.7 — هذا يعني 70% من القيم كانت "1" (نجحت). الوسط الحسابي هنا = نسبة مئوية.
> **وجه الشبه:** `mean(Survived)` = `survival rate`.

#### 💻 الكود: تحليل الجنس مقابل البقاء

```python
# Count survived/not survived by sex
titanic_train.groupby('Sex').Survived.value_counts()

# Calculate mean survival rate by sex (since Survived is 0/1, mean = percentage)
titanic_train[['Sex', 'Survived']].groupby(['Sex'], as_index=False).mean()

# Bar plot: Sex vs Survival rate
sns.barplot(x='Sex', y='Survived', data=titanic_train)
```

#### شرح كل سطر:
1. `.groupby('Sex').Survived.value_counts()` → يعرض عدد الناجين وغير الناجين لكل جنس.
2. `.groupby(['Sex'], as_index=False).mean()` → يحسب متوسط `Survived` لكل جنس = نسبة البقاء.
3. `as_index=False` → يجعل عمود التجميع `Sex` عموداً عادياً بدل أن يصبح `index`.

#### 4.3 `Pclass` و`Sex` و`Embarked` مقابل البقاء (`catplot`)

#### النص الأصلي يقول:
> الاستنتاجات: تقريباً جميع الإناث من الدرجتين 1 و2 نجَوْن. الإناث اللواتي توفّين كنّ معظمهن من الدرجة 3. الذكور من الدرجة 1 لديهم فرصة نجاة أعلى قليلاً من الدرجتين 2 و3.

#### 💻 الكود: `catplot` لتحليل متعدد الأبعاد

```python
# Scatter catplot: Embarked vs Age, colored by Survived
sns.catplot(x="Embarked", y="Age", hue="Survived", data=titanic_train)

# Scatter catplot: Pclass vs Age, colored by Survived
sns.catplot(x="Pclass", y="Age", hue="Survived", data=titanic_train)

# Scatter catplot: Sex vs Age, colored by Survived
sns.catplot(x="Sex", y="Age", hue="Survived", data=titanic_train)

# Grouped bar plot: Pclass + Sex + Embarked vs Survived
sns.catplot(x='Pclass', y='Survived', hue='Sex',
            col='Embarked', kind='bar', data=titanic_train)
```

#### شرح كل سطر:
1. `hue="Survived"` → يلوّن النقاط بلونين: 0 = أزرق (توفّي) و 1 = برتقالي (نجا).
2. `col='Embarked'` → يُنشئ مخططاً منفصلاً لكل قيمة `Embarked` (S, C, Q).
3. `kind='bar'` → يستخدم الأعمدة (بدلاً من النقاط الافتراضية).

#### 4.4 ميناء الصعود (`Embarked`) مقابل البقاء

#### النص الأصلي يقول:
> C = 0.553، Q = 0.389، S = 0.336

#### الشرح المبسّط:
الركاب الذين صعدوا من ميناء `C` (شيربورغ - فرنسا) كان لديهم أعلى معدل نجاة. السبب المحتمل أن معظمهم كانوا من الدرجة الأولى.

#### 4.5 مرافقة الأهل (`Parch`) مقابل البقاء

#### النص الأصلي يقول:
> Parch = 3 حقق أعلى معدل نجاة (0.6). Parch = 4 و 6 = صفر.

**الشرح المبسّط:**
`Parch` = عدد الآباء والأطفال على متن السفينة. من وجد معه 1-3 أفراد كان لديه فرصة نجاة أعلى. العائلات الكبيرة جداً (4+) كان من الصعب عليها التنسيق للإخلاء.

#### 4.6 العمر (`Age`) مقابل البقاء — `violinplot`

#### النص الأصلي يقول:
> من مخطط الكمان (`violinplot`) لـ `Pclass`:
> - الدرجة 1 تحتوي أقل عدداً من الأطفال مقارنة بالدرجتين 2 و3.
> - الدرجة 1 تحتوي كبار سن أكثر.
> - تقريباً جميع أطفال الدرجة 2 (0-10) نجَوْن.
> - معظم أطفال الدرجة 3 نجَوْن.
> من مخطط الكمان لـ `Sex`:
> - معظم أطفال الذكور (0-14) نجَوْن.
> - الإناث بين 18-40 لديهن فرصة نجاة أعلى.

#### 💻 الكود: `violinplot` للعمر

```python
# Create figure with 3 subplots side by side
fig = plt.figure(figsize=(15, 5))
ax1 = fig.add_subplot(131)  # first subplot
ax2 = fig.add_subplot(132)  # second subplot
ax3 = fig.add_subplot(133)  # third subplot

# Violin plot: Embarked vs Age grouped by Survived
sns.violinplot(x="Embarked", y="Age", hue="Survived",
               data=titanic_train, split=True, ax=ax1)

# Violin plot: Pclass vs Age grouped by Survived
sns.violinplot(x="Pclass", y="Age", hue="Survived",
               data=titanic_train, split=True, ax=ax2)

# Violin plot: Sex vs Age grouped by Survived
sns.violinplot(x="Sex", y="Age", hue="Survived",
               data=titanic_train, split=True, ax=ax3)
```

#### شرح كل سطر:
1. `plt.figure(figsize=(15,5))` → ينشئ لوحة بعرض 15 وارتفاع 5 بوصة.
2. `fig.add_subplot(131)` → 1 صف، 3 أعمدة، المخطط الأول (131 = Row1, Col3, Plot1).
3. `split=True` → يقسم مخطط الكمان إلى نصفين: نصف للناجين ونصف للمتوفّين.
4. `ax=ax1` → يرسم في المحور الأول.

---

### 5. معامل الارتباط (Pearson Correlation Coefficient)

#### النص الأصلي يقول:
> معادلة Pearson مع مثال عددي: x= [4,15,8,8,6], y=[3,10,6,7,4]. الناتج: r ≈ 0.97

#### 📐 المعادلة: معامل بيرسون للارتباط

$$
r = \frac{n(\sum xy) - (\sum x)(\sum y)}{\sqrt{[n\sum x^2 - (\sum x)^2][n\sum y^2 - (\sum y)^2]}}
$$

**الشرح:**
> - `r` = معامل الارتباط — يقيس العلاقة الخطية بين متغيّرَين.
> - `n` = عدد القيم = 5 في المثال.
> - `Σxy` = مجموع حاصل ضرب كل قيمتين متقابلتين = 290.
> - `Σx`, `Σy` = مجموع X ومجموع Y = 41، 30.
> - `Σx²`, `Σy²` = مجموع مربعات X وY.

**نطاق المعامل:**
| النطاق | التفسير |
| --- | --- |
| `0.0 – 0.39` | ارتباط ضعيف |
| `0.40 – 0.69` | ارتباط متوسط |
| `0.70 – 1.0` | ارتباط قوي |
| قيمة سالبة | ارتباط عكسي |

**حساب المثال خطوة بخطوة:**

| x | y | x² | y² | xy |
| --- | --- | --- | --- | --- |
| 4 | 3 | 16 | 9 | 12 |
| 15 | 10 | 225 | 100 | 150 |
| 8 | 6 | 64 | 36 | 48 |
| 8 | 7 | 64 | 49 | 56 |
| 6 | 4 | 36 | 16 | 24 |
| **Σ=41** | **Σ=30** | **Σ=405** | **Σ=210** | **Σ=290** |

```text
n = 5
Numerator   = 5*290 - 41*30 = 1450 - 1230 = 220
Denominator = sqrt((5*405 - 1681) * (5*210 - 900))
            = sqrt((2025-1681) * (1050-900))
            = sqrt(344 * 150)
            ≈ sqrt(51600) ≈ 227
r = 220 / 227 ≈ 0.97  → Strong positive correlation
```

#### 💻 الكود: `heatmap` للارتباط

#### ما هذا الكود؟
> يرسم خريطة حرارية (`heatmap`) تُظهر معامل ارتباط كل زوج من الأعمدة الرقمية.

```python
# Select numeric columns only
df_num = titanic_train[['Age', 'SibSp', 'Parch', 'Fare']]

# Draw simple correlation heatmap
sns.heatmap(df_num.corr())

# Draw annotated heatmap (with actual correlation values shown)
plt.figure(figsize=(15, 6))
sns.heatmap(titanic_train.drop('PassengerId', axis=1).corr(),
            vmax=0.6,        # limit color scale max
            square=True,     # make cells square
            annot=True)      # show correlation values in cells
```

#### شرح كل سطر:
1. `df_num = titanic_train[['Age','SibSp','Parch','Fare']]` → اختيار أربعة أعمدة رقمية فقط.
2. `df_num.corr()` → يحسب مصفوفة الارتباط — كل خلية = `r` بين عمودين.
3. `drop('PassengerId', axis=1)` → حذف `PassengerId` لأنه رقم تعريف لا معنى إحصائياً له.
4. `vmax=0.6` → أقصى قيمة للسلّم اللوني 0.6 (لإبراز الفروق).
5. `annot=True` → يكتب قيمة `r` داخل كل خلية.

**الناتج المتوقع:**
> - `Survived` و `Fare`: ارتباط موجب = **0.26** (ضعيف إلى متوسط).
> - `Survived` و `Pclass`: ارتباط سالب = **-0.34** (كلما ارتفعت الدرجة رقماً، انخفض البقاء).
> - `SibSp` و `Parch`: ارتباط = **0.41** (متوسط إيجابي — من يسافر مع إخوة يسافر مع أهل).

#### الدرس المستفاد:
> ارتباط سالب بين `Pclass` و `Survived` يعني: كلما كان رقم الدرجة **أعلى** (3 > 1)، كانت احتمالية النجاة **أقل**. الدرجة الأولى في التايتانيك = الأغنى.

---

### 6. جداول المحاور (`Pivot Tables`)

#### النص الأصلي يقول:
> "The inference we can draw from this table is:
> 1. The average age of survivors is 28, so young people tend to survive more.
> 2. People who paid higher fare rates were more likely to survive — the rich survived.
> 3. If you have parents, you had a higher chance of surviving.
> 4. If you are a child and have siblings, you have less of a chance of surviving."

#### 💻 الكود: جداول المحاور

```python
# Pivot table: mean Age, Fare, Parch, SibSp grouped by Survived
pd.pivot_table(titanic_train, index="Survived",
               values=["Age", "SibSp", "Parch", "Fare"])

# Pivot table: count tickets by Pclass for each Survived value
print(pd.pivot_table(titanic_train, index="Survived",
                     columns="Pclass", values="Ticket", aggfunc="count"))

# Pivot table: count tickets by Sex for each Survived value
print(pd.pivot_table(titanic_train, index="Survived",
                     columns="Sex", values="Ticket", aggfunc="count"))

# Pivot table: count tickets by Embarked for each Survived value
print(pd.pivot_table(titanic_train, index="Survived",
                     columns="Embarked", values="Ticket", aggfunc="count"))
```

#### شرح كل سطر:
1. `index="Survived"` → يجعل `Survived` (0/1) صفوف الجدول.
2. `values=["Age","SibSp","Parch","Fare"]` → يحسب متوسط هذه القيم لكل مجموعة.
3. `columns="Pclass"` → يجعل `Pclass` أعمدة الجدول.
4. `aggfunc="count"` → يعدّ القيم بدلاً من حساب المتوسط.

**الناتج المتوقع:**
```text
Survived | Age       | Fare      | Parch    | SibSp
0        | 30.626179 | 22.117887 | 0.329690 | 0.553734
1        | 28.343690 | 48.395408 | 0.464912 | 0.473684
```

**الاستنتاجات المنطقية:**
| الميزة | الناجون | غير الناجين | الاستنتاج |
| --- | --- | --- | --- |
| `Age` (متوسط) | 28.3 | 30.6 | الأصغر سناً نجوا أكثر |
| `Fare` (متوسط) | 48.4 | 22.1 | الأكثر دفعاً (أغنى) نجوا أكثر |
| `Parch` (متوسط) | 0.46 | 0.33 | من معهم أطفال/آباء نجوا أكثر |
| `SibSp` (متوسط) | 0.47 | 0.55 | من معهم إخوة كثيرون نجوا أقل |

---

### 7. هندسة الميزات (`Feature Engineering`)

#### النص الأصلي يقول:
> "We saw that our ticket and cabin data don't really make sense to us, so we have to simplify some of this data with feature engineering."
> الأهداف:
> 1. حذف القيم المفقودة من `Embarked`.
> 2. تضمين البيانات ذات الصلة فقط.
> 3. تحويل البيانات الفئوية رقمياً.
> 4. تعبئة القيم المفقودة في `Age` و `Fare`.
> 5. تطبيع عمود `Fare`.
> 6. تحجيم البيانات بين 0 و1 باستخدام `Standard Scaler`.

#### 7.1 تحويل عمود `Cabin` — `Transformers`

#### 💻 الكود: استخراج معلومات من `Cabin`

```python
# Print sample Cabin values to understand format
print(titanic_train.Cabin[0])    # nan (missing)
print(titanic_train.Cabin[1])    # C85 (single cabin)
print(titanic_train.Cabin[27])   # C23 C25 C27 (multiple cabins)

# Create new feature: number of cabins assigned to each passenger
titanic_train['cabin_multiple'] = titanic_train.Cabin.apply(
    lambda x: 0 if pd.isna(x) else len(x.split(' ')))
# Explanation: if NaN → 0, else count space-separated cabin codes

# Show distribution of cabin_multiple
titanic_train['cabin_multiple'].value_counts()

# Create new feature: first letter of cabin (deck indicator)
titanic_train['cabin_adv'] = titanic_train.Cabin.apply(
    lambda x: str(x)[0])
# Explanation: take first character of Cabin string
```

#### شرح كل سطر:
1. `pd.isna(x)` → يتحقق إذا كانت القيمة `NaN` — يُرجع `True` إذا كانت مفقودة.
2. `x.split(' ')` → يقسّم النص على المسافات — `"C23 C25 C27"` يصبح قائمة من 3 عناصر.
3. `len(...)` → يعدّ كبائن متعددة: `C23 C25 C27` → 3 كبائن.
4. `str(x)[0]` → يحوّل إلى نص ثم يأخذ الحرف الأول — يُعطي حرف السطح (`deck letter`).

#### 7.2 استخراج معلومات من `Ticket`

```python
# Check if ticket is purely numeric (1=yes, 0=no)
titanic_train['numeric_ticket'] = titanic_train.Ticket.apply(
    lambda x: 1 if x.isnumeric() else 0)

# Extract letters from ticket (prefix before last number)
titanic_train['ticket_letters'] = titanic_train.Ticket.apply(
    lambda x: ''.join(x.split(' ')[:-1])
              .replace('.', '').replace('/', '')
              .lower() if len(x.split(' ')[:-1]) > 0 else 0)
```

#### 7.3 استخراج اللقب (`Title`) من الاسم

#### النص الأصلي يقول:
> يستخدم `regex` لاستخراج اللقب من الاسم ثم يجمّع الألقاب النادرة تحت "Other".
> النتيجة: `Master` = 0.575، `Miss` = 0.702، `Mr` = 0.156، `Mrs` = 0.793، `Other` = 0.347

#### 💻 الكود: استخراج ومعالجة `Title`

```python
# Combine both datasets for consistent transformation
titanic_combined_data = [titanic_train, titanic_test]

for dataset in titanic_combined_data:
    # Extract title using regex (word followed by a dot)
    dataset['Title'] = dataset.Name.str.extract(' ([A-Za-z]+)\.')

for dataset in titanic_combined_data:
    # Replace rare titles with 'Other'
    dataset['Title'] = dataset['Title'].replace(
        ['Lady', 'Countess', 'Capt', 'Col', 'Don',
         'Dr', 'Major', 'Rev', 'Sir', 'Jonkheer', 'Dona'], 'Other')
    # Unify female titles
    dataset['Title'] = dataset['Title'].replace('Mlle', 'Miss')
    dataset['Title'] = dataset['Title'].replace('Ms', 'Miss')
    dataset['Title'] = dataset['Title'].replace('Mme', 'Mrs')

# Check survival rate by title
titanic_train[['Title', 'Survived']].groupby(
    ['Title'], as_index=False).mean()
```

#### 7.4 تحويل المتغيّرات الفئوية إلى أرقام

```python
# Map Title to numbers: Mr=1, Miss=2, Mrs=3, Master=4, Other=5
title_mapping = {"Mr": 1, "Miss": 2, "Mrs": 3, "Master": 4, "Other": 5}

for dataset in titanic_combined_data:
    dataset['Title'] = dataset['Title'].map(title_mapping)   # apply mapping
    dataset['Title'] = dataset['Title'].fillna(0)            # fill unmapped with 0

# Map Sex: female=1, male=0
for dataset in titanic_combined_data:
    dataset['Sex'] = dataset['Sex'].map({'female': 1, 'male': 0}).astype(int)

# Fill missing Embarked with most common value 'S'
for dataset in titanic_combined_data:
    dataset['Embarked'] = dataset['Embarked'].fillna('S')

# Map Embarked to numbers: S=0, C=1, Q=2
for dataset in titanic_combined_data:
    dataset['Embarked'] = dataset['Embarked'].map(
        {'S': 0, 'C': 1, 'Q': 2}).astype(int)
```

#### شرح كل سطر:
1. `title_mapping = {...}` → قاموس يربط النصوص بأرقام.
2. `.map(title_mapping)` → يطبّق القاموس على العمود — كل قيمة نصية تصبح رقماً.
3. `.fillna(0)` → يملأ القيم التي لم توجد في القاموس بالقيمة 0.
4. `dataset['Embarked'].fillna('S')` → يملأ القيم المفقودة بـ `'S'` لأنها الأكثر شيوعاً (644 راكب).

#### 7.5 معالجة القيم المفقودة في `Age`

#### النص الأصلي يقول:
> يملأ القيم المفقودة بأعداد عشوائية بين `(mean - std)` و `(mean + std)`.

```python
import sys

for dataset in titanic_combined_data:
    age_avg = dataset['Age'].mean()          # calculate mean age
    age_std = dataset['Age'].std()           # calculate std of age
    age_null_count = dataset['Age'].isnull().sum()  # count missing values

    # Generate random integers within 1 std from the mean
    age_null_random_list = np.random.randint(
        age_avg - age_std, age_avg + age_std, size=age_null_count)

    # Fill missing values with random values
    dataset['Age'][np.isnan(dataset['Age'])] = age_null_random_list

    # Convert to integer
    dataset['Age'] = dataset['Age'].astype(int)

print(age_avg)          # ≈ 30.27
print(age_null_count)   # 86 (in test set)
```

#### شرح كل سطر:
1. `age_avg - age_std` إلى `age_avg + age_std` → نطاق معقول للعمر (لا نريد قيم متطرفة).
2. `np.random.randint(low, high, size=n)` → يولّد `n` عدداً صحيحاً عشوائياً في النطاق.
3. `np.isnan(...)` → يجد مواقع `NaN` لاستبدالها.

**الفهم الخاطئ ❌:** تملأ القيم المفقودة دائماً بالمتوسط.
**الفهم الصحيح ✅:** تملأها بقيم عشوائية قريبة من المتوسط للحفاظ على التوزيع الطبيعي.

#### 7.6 تحويل `Age` و`Fare` إلى فئات (`Bands`)

```python
# Divide Age into 5 equal bins and check survival rate per bin
titanic_train['AgeBand'] = pd.cut(titanic_train['Age'], 5)
print(titanic_train[['AgeBand', 'Survived']].groupby(
    ['AgeBand'], as_index=False).mean())

# Map age groups to ordinal numbers
for dataset in titanic_combined_data:
    dataset.loc[dataset['Age'] <= 16, 'Age'] = 0          # children
    dataset.loc[(dataset['Age'] > 16) & (dataset['Age'] <= 32), 'Age'] = 1  # young adults
    dataset.loc[(dataset['Age'] > 32) & (dataset['Age'] <= 48), 'Age'] = 2  # adults
    dataset.loc[(dataset['Age'] > 48) & (dataset['Age'] <= 64), 'Age'] = 3  # middle-aged
    dataset.loc[dataset['Age'] > 64, 'Age'] = 4            # seniors

# Fill missing Fare with median
for dataset in titanic_combined_data:
    dataset['Fare'] = dataset['Fare'].fillna(titanic_train['Fare'].median())

# Divide Fare into 4 quantile-based bins
titanic_train['FareBand'] = pd.qcut(titanic_train['Fare'], 4)
print(titanic_train[['FareBand', 'Survived']].groupby(
    ['FareBand'], as_index=False).mean())

# Map fare groups to ordinal numbers
for dataset in titanic_combined_data:
    dataset.loc[dataset['Fare'] <= 7.91, 'Fare'] = 0
    dataset.loc[(dataset['Fare'] > 7.91) & (dataset['Fare'] <= 14.454), 'Fare'] = 1
    dataset.loc[(dataset['Fare'] > 14.454) & (dataset['Fare'] <= 31), 'Fare'] = 2
    dataset.loc[dataset['Fare'] > 31, 'Fare'] = 3
    dataset['Fare'] = dataset['Fare'].astype(int)
```

#### شرح كل سطر:
1. `pd.cut(..., 5)` → يقسّم النطاق إلى 5 فئات **متساوية الحجم** (بالمدى، لا العدد).
2. `pd.qcut(..., 4)` → يقسّم إلى 4 فئات **متساوية العدد** (كل ربعيل نفس العدد من الركاب).
3. `dataset.loc[condition, 'Age'] = value` → يضع قيمة في الصفوف التي تحقق الشرط.

#### 7.7 ميزة حجم العائلة (`FamilySize`) و (`IsAlone`)

```python
# Create FamilySize = SibSp + Parch + 1 (including the passenger)
for dataset in titanic_combined_data:
    dataset['FamilySize'] = dataset['SibSp'] + dataset['Parch'] + 1

# Create IsAlone feature: 1 if alone, 0 if with family
for dataset in titanic_combined_data:
    dataset['IsAlone'] = 0                                        # default: not alone
    dataset.loc[dataset['FamilySize'] == 1, 'IsAlone'] = 1       # alone if family size = 1

# Check survival rate by IsAlone
print(titanic_train[['IsAlone', 'Survived']].groupby(
    ['IsAlone'], as_index=False).mean())
```

**الناتج:** `IsAlone=0` (مع عائلة) → معدل نجاة = 0.505، `IsAlone=1` (وحيد) → 0.303.

#### 7.8 حذف الأعمدة غير الضرورية والتجهيز النهائي

```python
# Drop features that won't be used in the model
features_drop1 = ['Name', 'SibSp', 'Parch', 'Ticket', 'Cabin', 'FamilySize']
features_drop2 = ['cabin_multiple', 'cabin_adv', 'numeric_ticket',
                  'ticket_letters', 'name_title']

titanic_train = titanic_train.drop(features_drop1, axis=1)
titanic_train = titanic_train.drop(features_drop2, axis=1)
titanic_test = titanic_test.drop(features_drop1, axis=1)

# Drop temporary band columns
titanic_train = titanic_train.drop(['AgeBand', 'FareBand'], axis=1)

# Preview cleaned dataset
titanic_train.head()
```

**الناتج المتوقع بعد التنظيف:**

| PassengerId | Survived | Pclass | Sex | Age | Fare | Embarked | Title | IsAlone |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 3 | 0 | 1 | 0 | 0 | 1 | 0 |
| 2 | 1 | 1 | 1 | 2 | 3 | 1 | 3 | 0 |

#### 7.9 تجهيز `X_train` و `y_train` و `X_test`

```python
# Separate features (X) from target (y)
X_train = titanic_train.drop('Survived', axis=1)   # features only
y_train = titanic_train['Survived']                  # target only

X_test = titanic_test.drop("Survived", axis=1).copy()   # test features

# Verify shapes
X_train.shape, y_train.shape, X_test.shape
# Result: ((891, 8), (891,), (418, 8))
```

---

### 8. نشر النماذج (`Model Deployment`)

#### النص الأصلي يقول:
> "Here we will simply deploy the various models with default parameters and see which one yields the best result. The models: Logistic regression, K Nearest Neighbour, Support Vector classifier."

#### 💻 الكود: تدريب وتقييم النماذج

#### ما هذا الكود؟
> يستورد عدة نماذج `sklearn`، يدرّب كل واحد على `X_train` و `y_train`، ثم يقيّمه على بيانات التدريب.

```python
from sklearn.linear_model import LogisticRegression    # logistic regression
from sklearn.svm import SVC, LinearSVC                 # support vector classifiers
from sklearn.neighbors import KNeighborsClassifier     # k-nearest neighbors
from sklearn.tree import DecisionTreeClassifier        # decision tree
from sklearn.ensemble import RandomForestClassifier    # random forest
from sklearn.naive_bayes import GaussianNB             # naive bayes
from sklearn.linear_model import Perceptron            # perceptron
from sklearn.linear_model import SGDClassifier         # stochastic gradient descent

# --- Logistic Regression ---
clf = LogisticRegression()               # initialize model
clf.fit(X_train, y_train)                # train model
y_pred_log_reg = clf.predict(X_test)    # predict on test data
acc_log_reg = round(clf.score(X_train, y_train) * 100, 2)  # training accuracy
print(str(acc_log_reg) + ' percent')    # 80.58 percent

# --- Support Vector Classifier (SVC) ---
clf = SVC()
clf.fit(X_train, y_train)
y_pred_svc = clf.predict(X_test)
acc_svc = round(clf.score(X_train, y_train) * 100, 2)
print(acc_svc)  # 94.95

# --- Linear SVC ---
clf = LinearSVC()
clf.fit(X_train, y_train)
y_pred_linear_svc = clf.predict(X_test)
acc_linear_svc = round(clf.score(X_train, y_train) * 100, 2)
print(acc_linear_svc)  # 80.81

# --- K Nearest Neighbors ---
clf = KNeighborsClassifier(n_neighbors=3)   # k=3 neighbors
clf.fit(X_train, y_train)
y_pred_knn = clf.predict(X_test)
acc_knn = round(clf.score(X_train, y_train) * 100, 2)
print(acc_knn)  # 79.57

# --- Decision Tree ---
clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)
y_pred_decision_tree = clf.predict(X_test)
acc_decision_tree = round(clf.score(X_train, y_train) * 100, 2)
print(acc_decision_tree)  # 100.0

# --- Gaussian Naive Bayes ---
clf = GaussianNB()
clf.fit(X_train, y_train)
y_pred_gnb = clf.predict(X_test)
acc_gnb = round(clf.score(X_train, y_train) * 100, 2)
print(acc_gnb)  # 77.78

# --- Perceptron ---
clf = Perceptron(max_iter=5, tol=None)
clf.fit(X_train, y_train)
y_pred_perceptron = clf.predict(X_test)
acc_perceptron = round(clf.score(X_train, y_train) * 100, 2)
print(acc_perceptron)  # 61.95
```

#### شرح كل سطر:
1. `LogisticRegression()` → نموذج `Logistic Regression` — رغم الاسم هو للتصنيف لا الانحدار.
2. `.fit(X_train, y_train)` → يدرّب النموذج (يتعلم الأوزان من البيانات).
3. `.predict(X_test)` → يُطبّق النموذج على `X_test` ويُنتج تنبؤات.
4. `.score(X_train, y_train)` → يحسب دقة النموذج على بيانات التدريب (ليس `X_test`).
5. `round(..., 2)` → تقريب لمنزلتين عشريتين.
6. `KNeighborsClassifier(n_neighbors=3)` → يصنّف كل نقطة بحسب أصوات أقرب 3 جيران.
7. `DecisionTreeClassifier()` → يبني شجرة قرار — `100%` على `train` = إشارة `overfitting`.

#### مقارنة النماذج

| النموذج | دقة التدريب (%) | ملاحظة |
| --- | --- | --- |
| `DecisionTreeClassifier` | **100.0** | `Overfitting` — يحفظ البيانات |
| `SVC` | **94.95** | الأعلى دقة بدون `overfitting` واضح |
| `LinearSVC` | 80.81 | أبسط من `SVC` |
| `LogisticRegression` | 80.58 | سريع وقابل للتفسير |
| `KNeighborsClassifier` | 79.57 | يعتمد على k |
| `GaussianNB` | 77.78 | مناسب لبيانات صغيرة |
| `Perceptron` | 61.95 | الأضعف — لا يُناسب هذه المسألة |

#### مهم للامتحان ⚠️:
> `DecisionTree` بدقة 100% على `training set` = `Overfitting`. هذا يعني النموذج حفظ البيانات ولم يتعلّم. الاختبار الحقيقي هو الدقة على `test set`.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Binary Classification` | تصنيف إلى فئتين فقط (0 أو 1) | نجا / لم ينجُ |
| `Training set` | البيانات التي يتعلم منها النموذج | 891 راكب |
| `Test set` | البيانات التي نختبر عليها النموذج | 418 راكب |
| `EDA` | Exploratory Data Analysis — استكشاف البيانات بصرياً قبل النمذجة | `barplot`, `heatmap`, `violinplot` |
| `Feature Engineering` | إنشاء أو تحويل الميزات لتحسين النموذج | `Title`, `FamilySize`, `IsAlone` |
| `Overfitting` | النموذج يحفظ بيانات التدريب ولا يعمّم على بيانات جديدة | `DecisionTree` بدقة 100% |
| `Pearson r` | معامل الارتباط الخطي بين متغيّرَين ∈ [-1, 1] | `SibSp` و `Parch` = 0.41 |
| `pivot_table` | جدول محاور لتجميع وتلخيص البيانات | متوسط العمر حسب `Survived` |
| `groupby` | تجميع الصفوف حسب قيمة عمود ثم تطبيق دالة | `groupby('Pclass').mean()` |
| `fillna` | تعبئة القيم المفقودة (`NaN`) | `.fillna('S')` للـ `Embarked` |
| `lambda` | دالة مجهولة قصيرة الاستخدام الفوري | `lambda x: 0 if pd.isna(x) else ...` |
| `pd.cut` | تقسيم نطاق رقمي إلى فئات متساوية الحجم | `AgeBand` |
| `pd.qcut` | تقسيم إلى فئات متساوية العدد (ربيعيات) | `FareBand` |

---

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `pd.read_csv()` | قراءة ملف `CSV` إلى `DataFrame` | المسار يجب أن يكون صحيحاً |
| `df.describe()` | إحصاءات وصفية للأعمدة الرقمية | `count`, `mean`, `std`, `min`, `max` |
| `df.isnull().sum()` | عدّ القيم المفقودة | ضروري قبل أي معالجة |
| `sns.barplot()` | مخطط أعمدة مع فترة ثقة | مثالي لمقارنة المتوسطات |
| `sns.heatmap()` | خريطة حرارية للارتباط | `annot=True` لإظهار الأرقام |
| `sns.violinplot()` | مخطط كمان يجمع `boxplot` و `KDE` | `split=True` للمقارنة |
| `sns.catplot()` | مخطط فئوي متعدد الأبعاد | `col=` لإنشاء لوحات فرعية |
| `.fit()` | تدريب النموذج | يتعلم من `X_train`, `y_train` |
| `.predict()` | التنبؤ على بيانات جديدة | يُطبَّق على `X_test` |
| `.score()` | حساب دقة النموذج | `(صحيح / إجمالي) × 100` |

---

### جداول مقارنات سريعة

| المعيار | `pd.cut()` | `pd.qcut()` |
| --- | --- | --- |
| أساس التقسيم | نطاق متساوٍ | عدد متساوٍ في كل فئة |
| الاستخدام | `AgeBand` (0-80 تُقسم لـ5) | `FareBand` (4 ربيعيات) |
| متى تختاره | عندما النطاق ذو معنى | عندما التوزيع المتوازن مهم |

| المعيار | `SVC` | `LinearSVC` |
| --- | --- | --- |
| النواة (`kernel`) | `RBF` (غير خطي) | خطي فقط |
| الدقة في المثال | 94.95% | 80.81% |
| السرعة | أبطأ | أسرع |
| متى تختاره | بيانات غير خطية | بيانات كبيرة وخطية |

---

### قاموس المصطلحات

| الفئة | المصطلحات |
| --- | --- |
| بيانات | `DataFrame`, `CSV`, `NaN`, `dtype`, `shape`, `index` |
| إحصاء | `mean`, `std`, `median`, `quartile`, `Pearson r`, `correlation` |
| تصوير | `barplot`, `heatmap`, `violinplot`, `catplot`, `FacetGrid` |
| هندسة ميزات | `feature engineering`, `label encoding`, `binning`, `fillna`, `lambda` |
| نمذجة | `training set`, `test set`, `fit`, `predict`, `score`, `accuracy` |
| نماذج | `LogisticRegression`, `SVC`, `LinearSVC`, `KNN`, `DecisionTree`, `GaussianNB`, `Perceptron` |

---

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| الاعتقاد بأن `describe()` يشمل الأعمدة النصية تلقائياً | يجب إضافة `include=['O']` للأعمدة النصية |
| تقييم النموذج على `X_train` واعتبارها الدقة الحقيقية | الدقة الحقيقية تقاس على `X_test` |
| اعتبار `DecisionTree` بدقة 100% نتيجة ممتازة | 100% على `train` = `Overfitting` |
| نسيان تطبيق نفس تحويلات `train` على `test` | استخدم `titanic_combined_data` وطبّق على كليهما |
| استخدام `pd.cut` بدل `pd.qcut` عندما التوزيع متحيّز | `pd.qcut` يضمن عدداً متساوياً في كل فئة |
| تعبئة `NaN` في `Age` بالمتوسط فقط | تعبئة عشوائية قريبة من المتوسط تحافظ على التوزيع |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: الخط الكامل لمشروع ML على تايتانيك

> هدف هذه العملية: تحويل البيانات الخام إلى نموذج تنبؤي جاهز للتقييم.

```algorithm
1  | استيراد المكتبات             | pandas, numpy, seaborn, matplotlib | تحميل أدوات التحليل والتصوير
2  | قراءة البيانات               | pd.read_csv()                       | تحميل train (891) و test (418)
3  | استكشاف البيانات             | .describe(), .isnull().sum()        | فهم البنية والقيم المفقودة
4  | تصوير العلاقات               | sns.barplot, catplot, violinplot    | تحديد الميزات المؤثرة بصرياً
5  | حساب الارتباط                | .corr(), sns.heatmap()             | قياس العلاقة الإحصائية بين الميزات
6  | جداول المحاور                | pd.pivot_table()                   | استنتاجات عميقة من التجميع
7  | هندسة الميزات                | lambda, str.extract, pd.cut        | إنشاء Title, cabin_multiple, FamilySize, IsAlone
8  | تحويل فئوي لرقمي             | .map(), title_mapping              | تحويل Sex, Embarked, Title لأرقام
9  | معالجة القيم المفقودة        | fillna, np.random.randint          | تعبئة Age و Fare و Embarked
10 | تقسيم إلى فئات              | pd.cut(), pd.qcut(), .loc[]         | تحويل Age و Fare لفئات رقمية (0-4)
11 | حذف الأعمدة غير الضرورية    | .drop()                            | Name, Ticket, Cabin, SibSp, Parch, FamilySize…
12 | تجهيز X_train, y_train, X_test | .drop('Survived'), df['Survived'] | فصل الميزات عن الهدف
13 | تدريب النماذج                | .fit(X_train, y_train)             | تطبيق Logistic, SVC, KNN, DecisionTree…
14 | تقييم النماذج               | .score(X_train, y_train)           | مقارنة الدقة واختيار الأفضل
```

#### نقاط التنفيذ:
- يجب دائماً تطبيق نفس التحويلات على `train` و `test` معاً.
- لا تستخدم `X_train` في التقييم النهائي — استخدم `X_test`.
- `Overfitting` علامته دقة عالية جداً على `train` مع انخفاض على `test`.

---

#### ⚙️ الخطوات / الخوارزمية: حساب معامل ارتباط بيرسون يدوياً

> لحساب `Pearson r` بين مجموعتين من البيانات.

```algorithm
1 | حضّر جدول القيم              | قلم وورقة / Excel | أعمدة: x, y, x², y², xy
2 | احسب Σx, Σy, Σx², Σy², Σxy  | الجمع            | مجموع كل عمود
3 | احسب البسط (Numerator)       | الصيغة           | n(Σxy) - (Σx)(Σy)
4 | احسب المقام (Denominator)    | الجذر التربيعي   | sqrt([nΣx² - (Σx)²][nΣy² - (Σy)²])
5 | قسّم البسط على المقام        | القسمة           | r = Numerator / Denominator
6 | فسّر النتيجة                  | الجدول المرجعي   | 0-0.39 ضعيف, 0.40-0.69 متوسط, 0.70-1.0 قوي
```

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| تصفية البيانات | `df[df['col'] == value]` | عزل مجموعة محددة من الصفوف |
| حساب نسبة البقاء | `df.groupby('col')['Survived'].mean()` | نسبة الناجين لكل فئة |
| تحويل فئوي | `df['col'].map({'A': 1, 'B': 0})` | تحويل نص لرقم |
| تعبئة مفقود | `df['col'].fillna(df['col'].median())` | تعبئة `NaN` بالوسيط |
| تطبيق دالة | `df['col'].apply(lambda x: ...)` | تحويل كل قيمة باستخدام دالة |
| قطع فئات | `df.loc[df['Age'] <= 16, 'Age'] = 0` | تحويل قيم مستمرة لفئات |
| تدريب نموذج | `clf.fit(X_train, y_train)` | كل نماذج `sklearn` |
| تنبؤ نموذج | `y_pred = clf.predict(X_test)` | استخراج تنبؤات على بيانات جديدة |

---

### الأفكار الرئيسية الشاملة

1. **مشروع `ML` الكامل**: ليس مجرد تطبيق نموذج — 70% من الوقت في `EDA` و `Feature Engineering`.
2. **القيم المفقودة (`Missing Values`)**: تجاهلها يكسر النموذج. يجب معالجتها بطريقة ذكية.
3. **`Survived` كمتوسط**: بما أن القيم 0 و1، يمكن استخدام `.mean()` مباشرة لحساب نسبة البقاء.
4. **الارتباط لا يعني السببية**: `Pclass` مرتبط بـ`Survived` لكن هذا لا يعني أن الدرجة هي السبب المباشر — السبب قد يكون الثروة أو موقع الكابينة.
5. **`Overfitting` مقابل `Underfitting`**: `DecisionTree` بـ100% هو `Overfitting`. `Perceptron` بـ62% هو `Underfitting`.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط/صعب. توزيع: مقارنات 20% / سيناريو كود 35% / تطبيق 30% / تتبع خوارزمية 15%.

### السؤال 1 (متوسط)
ما الفرق بين `pd.cut()` و `pd.qcut()` عند تحويل عمود `Age`؟

أ) `cut` يقسّم حسب عدد متساوٍ من الصفوف، `qcut` يقسّم حسب نطاق متساوٍ
ب) `cut` يقسّم حسب نطاق متساوٍ، `qcut` يقسّم حسب عدد متساوٍ من الصفوف
ج) كلاهما يقسّم حسب النطاق
د) كلاهما يقسّم حسب العدد

**الإجابة الصحيحة: ب**
**التعليل:** `pd.cut` يقسّم النطاق الكلي إلى أجزاء متساوية الحجم (مثل 0-16-32-48-64-80). `pd.qcut` يضمن أن كل فئة تحتوي نفس عدد العناصر تقريباً (مثل الربيعيات). (أ) عكس الصحيح. (ج) و (د) يصفان نفس الشيء بشكل خاطئ.

---

### السؤال 2 (متوسط)
ما قيمة `mean()` لعمود `Survived` إذا كان 342 راكباً نجوا من أصل 891؟

أ) 342
ب) 549
ج) 0.384
د) 38.4

**الإجابة الصحيحة: ج**
**التعليل:** `mean = 342/891 ≈ 0.384`. لأن القيم 0 و1، فالمتوسط = نسبة الأحداث = 0.384. (أ) هو العدد الكلي للناجين. (ب) عدد غير الناجين. (د) النسبة × 100 وليس `mean`.

---

### السؤال 3 (متوسط)
ما الذي يعنيه معامل الارتباط `-0.34` بين `Pclass` و `Survived`؟

أ) لا علاقة بينهما
ب) كلما ارتفع رقم الدرجة (3>1)، ارتفع احتمال البقاء
ج) كلما ارتفع رقم الدرجة (3>1)، انخفض احتمال البقاء
د) الارتباط قوي وإيجابي

**الإجابة الصحيحة: ج**
**التعليل:** القيمة السالبة تعني علاقة عكسية. رقم `Pclass=3` (الأعلى رقماً) يقابله بقاء أقل. (أ) خاطئ — القيمة -0.34 تعني ارتباطاً متوسطاً عكسياً. (ب) عكس الصحيح. (د) خاطئ — السالب لا يكون إيجابياً.

---

### السؤال 4 (صعب)
في الكود التالي، ماذا يُنتج `titanic_train.groupby('Sex').Survived.value_counts()`؟

أ) جدول يُظهر متوسط البقاء لكل جنس
ب) جدول يُظهر عدد الناجين وغير الناجين لكل جنس
ج) جدول يُظهر عمود `Sex` فقط
د) `Boolean Series` يُظهر صح وخطأ

**الإجابة الصحيحة: ب**
**التعليل:** `groupby('Sex')` يقسّم البيانات على الجنس. `.Survived.value_counts()` يعدّ عدد مرات كل قيمة (0 أو 1) في `Survived` لكل مجموعة. (أ) `.mean()` يعطي المتوسط لا `.value_counts()`. (ج) و(د) غير صحيحتان.

---

### السؤال 5 (صعب)
`DecisionTreeClassifier` حقق دقة 100% على `X_train`. ماذا يعني ذلك؟

أ) النموذج ممتاز ويجب استخدامه
ب) النموذج يعاني `Overfitting` ويحتمل أداء ضعيفاً على `X_test`
ج) النموذج يعاني `Underfitting`
د) الدقة على `X_test` ستكون أيضاً 100%

**الإجابة الصحيحة: ب**
**التعليل:** 100% على `training set` يعني النموذج حفظ البيانات. لن يعمل جيداً على بيانات جديدة (`overfitting`). (أ) يجب التحقق من أداء `test set`. (ج) `Underfitting` يُنتج دقة منخفضة. (د) `Overfitting` يعني الدقة ستنخفض على `test`.

---

### السؤال 6 (متوسط)
ما الفائدة من استخدام `as_index=False` في `groupby()`؟

أ) يجعل النتيجة `Series` بدلاً من `DataFrame`
ب) يجعل عمود التجميع عموداً عادياً بدلاً من `index`
ج) يلغي عملية التجميع
د) يرتّب النتائج تصاعدياً

**الإجابة الصحيحة: ب**
**التعليل:** افتراضياً `groupby` يجعل العمود المجمّع عليه `index`. `as_index=False` يُبقيه عموداً عادياً في `DataFrame`. (أ) عكس ذلك — بدونه تصبح النتيجة `Series`. (ج) لا يلغي شيئاً. (د) الترتيب يتم بـ `.sort_values()`.

---

### السؤال 7 (صعب)
ما قيمة `r` إذا كان `n=5`, `Σxy=290`, `Σx=41`, `Σy=30`, `Σx²=405`, `Σy²=210`؟

أ) 0.5
ب) 0.7
ج) 0.97
د) 1.0

**الإجابة الصحيحة: ج**
**التعليل:** Numerator = 5×290 - 41×30 = 220. Denominator = sqrt((5×405-1681)×(5×210-900)) = sqrt(344×150) ≈ 227. r = 220/227 ≈ 0.97. (أ) و(ب) قيم خاطئة. (د) الارتباط التام نادر جداً.

---

### السؤال 8 (متوسط)
لماذا تُستخدم `titanic_combined_data = [titanic_train, titanic_test]`؟

أ) لدمج البيانات في جدول واحد
ب) لتطبيق نفس التحويلات على `train` و`test` بحلقة واحدة
ج) لحذف البيانات المكررة
د) لتقليل حجم البيانات

**الإجابة الصحيحة: ب**
**التعليل:** إنشاء قائمة من `DataFrames` يسمح بالمرور عليهما بحلقة `for` وتطبيق نفس التحويل (Title, Embarked, Age…) دون تكرار الكود. (أ) `concat()` أو `merge()` يدمجان البيانات. (ج) `.drop_duplicates()` للمكررات. (د) لا يؤثر على الحجم.

---

### السؤال 9 (صعب)
ماذا يُرجع الكود: `titanic_train.Cabin.apply(lambda x: 0 if pd.isna(x) else len(x.split(' ')))`؟

أ) `True/False` لكل صف
ب) الحرف الأول من كود الكابينة
ج) عدد الكبائن المخصصة لكل راكب
د) عدد الأحرف في كود الكابينة

**الإجابة الصحيحة: ج**
**التعليل:** `pd.isna(x)` → إذا `NaN` يُرجع 0. وإلا `x.split(' ')` يقسّم على المسافة (مثل `"C23 C25"` → `['C23','C25']`) ثم `len()` يعدّ القائمة = عدد الكبائن. (أ) `.isnull()` يُرجع `Boolean`. (ب) `str(x)[0]` يُرجع الحرف. (د) `len(x)` دون `split` يعدّ الأحرف.

---

### السؤال 10 (متوسط)
لماذا نملأ القيم المفقودة في `Age` بقيم عشوائية حول المتوسط بدلاً من المتوسط مباشرة؟

أ) لأن العشوائية أكثر دقة
ب) للحفاظ على التوزيع الطبيعي وتجنّب تشويه التوزيع
ج) لأن المتوسط غير متاح
د) لأن `NaN` لا تقبل قيمة عددية

**الإجابة الصحيحة: ب**
**التعليل:** إذا ملأنا بالمتوسط مباشرة، سيكون هناك تجمّع مصطنع عند قيمة واحدة يشوّه التوزيع. القيم العشوائية قريبة من المتوسط لكنها تحافظ على التشتّت الطبيعي. (أ) ليست دقة عشوائية لكن واقعية. (ج) المتوسط متاح دائماً. (د) `NaN` تقبل أي قيمة رقمية.

---

### السؤال 11 (صعب)
ما الفرق بين `SVC()` و `LinearSVC()` وأيهما أفضل في مثال تايتانيك؟

أ) `LinearSVC` أفضل دائماً — 80% مقابل 94%
ب) `SVC` أفضل في هذا المثال — 94% مقابل 80%، لأن البيانات غير خطية تماماً
ج) كلاهما يُنتج نفس النتيجة
د) `LinearSVC` يستخدم `RBF` kernel

**الإجابة الصحيحة: ب**
**التعليل:** `SVC()` يستخدم `RBF kernel` افتراضياً يلتقط العلاقات غير الخطية. دقته 94.95% > 80.81% للـ`LinearSVC`. (أ) يعكس الحقيقة. (ج) الأرقام مختلفة. (د) `RBF` في `SVC` وليس `LinearSVC`.

---

### السؤال 12 (متوسط)
ماذا يعني `split=True` في `sns.violinplot()`؟

أ) يقسّم البيانات إلى مجموعتي تدريب واختبار
ب) يقسّم مخطط الكمان إلى نصفين لعرض مجموعتين (0 و1) جنباً إلى جنب
ج) يقسّم المحور X إلى نصفين
د) يحذف نصف البيانات

**الإجابة الصحيحة: ب**
**التعليل:** `split=True` مع `hue='Survived'` يرسم نصف الكمان الأيسر للناجين والأيمن للمتوفين على نفس المحور الرأسي. (أ) لا علاقة بالتقسيم للتدريب. (ج) و(د) غير صحيحتان.

---

### السؤال 13 (صعب)
بعد حساب `FamilySize = SibSp + Parch + 1`، ما الراكب الذي يحقق `FamilySize = 1`؟

أ) راكب معه سبعة من الإخوة
ب) راكب يسافر وحيداً بدون أحد
ج) راكب معه والداه فقط
د) أي راكب

**الإجابة الصحيحة: ب**
**التعليل:** `FamilySize = SibSp + Parch + 1 = 0 + 0 + 1 = 1`. هذا يعني `SibSp=0` (لا إخوة) و`Parch=0` (لا آباء أو أطفال). الراكب وحيد تماماً. (أ) سبعة إخوة = 7+0+1=8. (ج) `Parch=2` → 0+2+1=3.

---

### السؤال 14 (صعب)
ما الناتج الصحيح لـ `titanic_train[['Sex', 'Survived']].groupby(['Sex'], as_index=False).mean()`؟

أ) عدد الإناث والذكور في كل فئة
ب) نسبة بقاء الإناث والذكور (female=0.742, male=0.188)
ج) مجموع قيم `Survived` لكل جنس
د) جدول من عمود واحد فقط

**الإجابة الصحيحة: ب**
**التعليل:** `mean()` على عمود يحتوي 0 و1 يُعطي النسبة المئوية للقيمة 1. female mean = 233/(233+81) = 0.742، male mean = 109/(109+468) = 0.188. (أ) `.value_counts()` يُعطي العدد. (ج) `.sum()` يُعطي المجموع. (د) الناتج `DataFrame` بعمودَين.

---

### السؤال 15 (صعب)
ما الهدف من `titanic_train.drop('PassengerId', axis=1).corr()` في الـ`heatmap`؟

أ) حذف عمود `PassengerId` من البيانات نهائياً
ب) استبعاد `PassengerId` من حساب الارتباط لأنه مجرد رقم تعريف لا علاقة إحصائية له
ج) تحسين دقة النموذج مباشرة
د) تغيير الفهرس

**الإجابة الصحيحة: ب**
**التعليل:** `PassengerId` هو ترقيم تسلسلي (1, 2, 3…) لا معنى إحصائياً له. ارتباطه بأي متغير آخر سيكون مصطنعاً. (أ) `drop` هنا مؤقت (لا `inplace=True`). (ج) لا يؤثر مباشرة على النموذج. (د) `axis=1` يعني حذف عمود لا تغيير الفهرس.

---

### السؤال 16 (متوسط)
ما معنى `col='Embarked'` في `sns.catplot(x='Pclass', y='Survived', hue='Sex', col='Embarked', kind='bar', data=titanic_train)`؟

أ) يحوّل `Embarked` إلى ألوان مختلفة
ب) يُنشئ مخططاً منفصلاً لكل قيمة من قيم `Embarked` (S, C, Q)
ج) يرسم `Embarked` على المحور X
د) يحذف `Embarked` من الرسم

**الإجابة الصحيحة: ب**
**التعليل:** `col=` في `seaborn catplot` يُنشئ `FacetGrid` — شبكة من المخططات حيث كل لوحة فرعية تمثّل قيمة مختلفة من `Embarked`. (أ) `hue=` يتحكم في الألوان. (ج) `x=` يتحكم في المحور X. (د) لا يحذف شيئاً.

---

### السيناريو 1: تحليل كود استخراج `Title` ومعالجته

> المطوّر كتب الكود التالي لاستخراج لقب الراكب من اسمه:
> ```python
> dataset['Title'] = dataset.Name.str.extract(' ([A-Za-z]+)\.')
> dataset['Title'] = dataset['Title'].replace(
>     ['Lady', 'Countess', 'Capt'], 'Other')
> dataset['Title'] = dataset['Title'].replace('Mlle', 'Miss')
> title_mapping = {"Mr": 1, "Miss": 2, "Mrs": 3, "Master": 4, "Other": 5}
> dataset['Title'] = dataset['Title'].map(title_mapping)
> ```
> معدلات البقاء: `Master`=0.575, `Miss`=0.702, `Mr`=0.156, `Mrs`=0.793

### السؤال 1.1 (hard)
ماذا يُنتج `' ([A-Za-z]+)\.'` كـ `regex pattern`؟

أ) يستخرج أي كلمة تبدأ بمسافة
ب) يستخرج أي تسلسل من الحروف يسبقه مسافة ويليه نقطة
ج) يستخرج الاسم الأول فقط
د) يستخرج الاسم الأخير فقط

**الإجابة الصحيحة: ب**
**التعليل:** `' '` = مسافة قبل اللقب. `([A-Za-z]+)` = مجموعة التقاط لحروف إنجليزية. `\.` = نقطة حرفية. النتيجة: يلتقط "Mr" من "Braund, Mr. Owen Harris".

### السؤال 1.2 (hard)
لماذا يُصنَّف `Mrs` كأعلى معدل بقاء (0.793)؟

أ) لأنهن من الدرجة الأولى فقط
ب) لأن `Mrs` = نساء متزوجات، تأثير "أسياد والأطفال أولاً" + غالباً مصاحبتهن لعائلة
ج) لأن السيدات أسرع في الهروب
د) الارتباط مصادفة

**الإجابة الصحيحة: ب**
**التعليل:** السيدات المتزوجات (Mrs) غالباً مصاحبات لأزواج أو أطفال، وسياسة الإخلاء "نساء وأطفال أولاً" طُبِّقت بجدية. السياق الاجتماعي يؤثر في الإنقاذ.

### السؤال 1.3 (hard)
ماذا يحدث إذا لم نضع `fillna(0)` بعد `.map(title_mapping)`؟

أ) لا شيء — القيم ستبقى صحيحة
ب) الألقاب التي لم تُوجد في `title_mapping` ستصبح `NaN` وتؤثر على النموذج
ج) النموذج يتجاهل `NaN` تلقائياً
د) `.map()` يتعامل مع الحالات غير الموجودة بشكل افتراضي

**الإجابة الصحيحة: ب**
**التعليل:** `.map()` يُرجع `NaN` لأي قيمة غير موجودة في القاموس. بعض نماذج `sklearn` لا تقبل `NaN` كمدخل وستُرمي خطأ. `fillna(0)` يُحوّل `NaN` إلى 0 (مجموعة "أخرى غير محددة").

---

## الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح 1 (logic)

**الكود (يحتوي خطأ):**
```python
# Calculate survival rate by sex
survived_rate = titanic_train.groupby('Sex').Survived.sum()
print(survived_rate)
```

**اكتشف الخطأ:** يستخدم `.sum()` بدلاً من `.mean()` — يُرجع عدد الناجين لا نسبة البقاء.

**التصحيح:**
```python
# Calculate survival RATE (percentage) by sex using mean on binary column
survived_rate = titanic_train.groupby('Sex').Survived.mean()
print(survived_rate)
```

**شرح الحل:**
1. `.sum()` يُرجع `female=233`, `male=109` — وهذه أعداد لا نسب.
2. `.mean()` على عمود 0/1 يُرجع النسبة المئوية (`female=0.742`, `male=0.188`).
3. الهدف هو مقارنة نسبة البقاء لا الأعداد المطلقة.

---

### سؤال تصحيح 2 (misconception)

**الكود (يحتوي خطأ):**
```python
# Fill missing Age values with the mean
titanic_train['Age'] = titanic_train['Age'].fillna(
    titanic_train['Age'].mean())
```

**اكتشف الخطأ:** تعبئة جميع القيم المفقودة (177 قيمة) بالمتوسط نفسه يُشوّه توزيع العمر ويخلق تجمّعاً مصطنعاً.

**التصحيح:**
```python
import numpy as np

age_avg = titanic_train['Age'].mean()              # compute mean
age_std = titanic_train['Age'].std()               # compute standard deviation
age_null_count = titanic_train['Age'].isnull().sum()  # count missing

# Generate random values within 1 std of mean
age_null_random_list = np.random.randint(
    age_avg - age_std, age_avg + age_std, size=age_null_count)

# Fill missing with random values to preserve distribution
titanic_train['Age'][np.isnan(titanic_train['Age'])] = age_null_random_list
titanic_train['Age'] = titanic_train['Age'].astype(int)
```

**شرح الحل:**
1. تعبئة بنفس القيمة 177 مرة تُنتج "قمة مصطنعة" في التوزيع عند قيمة المتوسط.
2. القيم العشوائية في نطاق `(mean ± std)` تُبقي التوزيع طبيعياً.
3. تحويل إلى `int` لاتساق نوع البيانات مع باقي القيم.

---

### سؤال تصحيح 3 (syntax + logic)

**الكود (يحتوي خطأ):**
```python
# Trying to map Embarked to numbers
for dataset in titanic_combined_data:
    dataset['Embarked'] = dataset['Embarked'].map(
        {'S': 0, 'C': 1, 'Q': 2})
    # No fillna for missing Embarked values!
```

**اكتشف الخطأ:** لم تُملأ القيم المفقودة في `Embarked` قبل التحويل — ستبقى `NaN` بعد `.map()`.

**التصحيح:**
```python
for dataset in titanic_combined_data:
    # Fill missing Embarked with most common value 'S' FIRST
    dataset['Embarked'] = dataset['Embarked'].fillna('S')
    # Then map to numbers
    dataset['Embarked'] = dataset['Embarked'].map(
        {'S': 0, 'C': 1, 'Q': 2}).astype(int)
```

**شرح الحل:**
1. `Embarked` يحتوي 2 قيمة مفقودة — بدون `fillna` ستبقى `NaN`.
2. `NaN` لا توجد في القاموس فستُحوَّل إلى `NaN` بعد `.map()`.
3. `astype(int)` ستفشل إذا وُجد `NaN` (يحتاج `int` لا يقبل `NaN`).

---

### سؤال تصحيح 4 (dead_code)

**الكود (يحتوي خطأ):**
```python
# Train and evaluate logistic regression
clf = LogisticRegression()
clf.fit(X_train, y_train)
y_pred_log_reg = clf.predict(X_test)
acc_log_reg = round(clf.score(X_test, y_test) * 100, 2)  # using X_test, y_test
print(str(acc_log_reg) + ' percent')
```

**اكتشف الخطأ:** في مشروع تايتانيك، `y_test` غير متاح (البيانات الحقيقية لا تحتوي label). الكود الصحيح يقيّم على `X_train, y_train`.

**التصحيح:**
```python
clf = LogisticRegression()
clf.fit(X_train, y_train)
y_pred_log_reg = clf.predict(X_test)

# Evaluate on training data (test labels are not available in Kaggle competition)
acc_log_reg = round(clf.score(X_train, y_train) * 100, 2)
print(str(acc_log_reg) + ' percent')  # 80.58 percent
```

**شرح الحل:**
1. في مسابقات `Kaggle`، `test set` بدون `Survived` — لا `y_test`.
2. نقيس دقة النموذج على `X_train` مع العلم أنها دقة "داخلية".
3. الدقة الحقيقية تُقاس عند التقديم في `Kaggle`.

---

### سؤال تصحيح 5 (return_check)

**الكود (يحتوي خطأ):**
```python
# Create IsAlone feature
for dataset in titanic_combined_data:
    dataset['FamilySize'] = dataset['SibSp'] + dataset['Parch'] + 1
    dataset['IsAlone'] = 1   # default everyone is alone (WRONG!)
    dataset.loc[dataset['FamilySize'] > 1, 'IsAlone'] = 0
```

**اكتشف الخطأ:** القيمة الافتراضية `IsAlone = 1` ثم نُعدّل للعائلات. الصحيح عكسه: الافتراضي 0 (مع عائلة) ثم نُعدّل المنفردين.

**التصحيح:**
```python
for dataset in titanic_combined_data:
    dataset['FamilySize'] = dataset['SibSp'] + dataset['Parch'] + 1
    dataset['IsAlone'] = 0                                       # default: not alone
    dataset.loc[dataset['FamilySize'] == 1, 'IsAlone'] = 1      # set alone when FamilySize=1
```

**شرح الحل:**
1. الكود الخاطئ: `IsAlone=1` لكل الركاب ثم يُصحح للعائلات → المنفردون يبقون 1 صحيحاً لكنه غير واضح.
2. التصحيح أوضح منطقياً: الافتراضي "مع عائلة" ثم نُعدّل الحالة الاستثنائية.
3. الكود الخاطئ يُنتج نفس النتيجة لكن منطقه مُربك ومعرّض للخطأ في التوسعة.

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### تمرين 1 (تمرين إضافي): حساب معدل النجاة — fill_gaps

**السيناريو / المطلوب:**
أكمل الكود التالي لحساب وعرض معدل بقاء الركاب مجمّعاً حسب `Pclass`.

**المطلوب:**

```python
# Complete the blanks to group by Pclass and compute survival rate
survival_by_class = titanic_train[['Pclass', '_______']].groupby(
    ['_______'], as_index=False)._______()

print(survival_by_class)
```

1. ما هو العمود الناقص الأول `_______`؟
2. ما هو العمود الناقص الثاني `_______`؟
3. ما الدالة الناقصة `_______` لحساب النسبة؟

**نموذج الحل:**

```python
# Group by Pclass and compute mean survival rate (binary column → percentage)
survival_by_class = titanic_train[['Pclass', 'Survived']].groupby(
    ['Pclass'], as_index=False).mean()

print(survival_by_class)
```

```text
   Pclass  Survived
0       1  0.629630   # 62.96%
1       2  0.472826   # 47.28%
2       3  0.242363   # 24.23%
```

---

### تمرين 2 (تمرين إضافي): إنشاء ميزة `Title` — code_fix

**السيناريو / المطلوب:**
الكود التالي يُحاول استخراج `Title` من `Name` لكنه يحتوي خطأ:

```python
# Extract title from Name using regex
dataset['Title'] = dataset.Name.str.extract('([A-Za-z]+)\.')
# Missing space before title - won't match correctly for all names
```

**المطلوب:**
1. ما الخطأ في نمط الـ `regex`؟
2. صحّح الكود.

**نموذج الحل:**
الخطأ: لا توجد مسافة قبل `(` — في بعض الأسماء سيُعطي نتيجة خاطئة (مثل الاسم الأول).

```python
# Correct: add space before group to match title after comma
dataset['Title'] = dataset.Name.str.extract(' ([A-Za-z]+)\.')
# The space ensures we match the title (which comes after ", " in the name format)
```

---

### تمرين 3 (تمرين إضافي): تفسير `heatmap` — scenario

**السيناريو / المطلوب:**
بناءً على مصفوفة الارتباط التالية:

| | Survived | Pclass | Age | SibSp | Parch | Fare |
| --- | --- | --- | --- | --- | --- | --- |
| Survived | 1 | -0.34 | -0.077 | -0.035 | 0.082 | 0.26 |

**المطلوب:**
1. ما الميزة الأكثر ارتباطاً إيجابياً بـ`Survived`؟
2. ما الميزة الأكثر ارتباطاً سلبياً؟
3. هل ارتباط `Parch` بـ`Survived` قوي أم ضعيف؟

**نموذج الحل:**
1. `Fare` = 0.26 — الأعلى إيجابياً (الأغنى → نجا أكثر).
2. `Pclass` = -0.34 — الأعلى سلبياً (الدرجة الأعلى رقماً → نجا أقل).
3. `Parch` = 0.082 — ضعيف جداً (لأقل من 0.39).

---

### تمرين 4 (تمرين إضافي): تجهيز `X_train` و `y_train` — fill_gaps

**السيناريو / المطلوب:**
أكمل الكود:

```python
# Separate features and target
X_train = titanic_train.drop('_______', axis=___)
y_train = titanic_train['_______']

X_test = titanic_test.drop("_______", axis=1)._____()
```

**نموذج الحل:**

```python
# Drop target column from features
X_train = titanic_train.drop('Survived', axis=1)   # features (remove target)
y_train = titanic_train['Survived']                  # target column only

# Copy test features (without target - not available in test)
X_test = titanic_test.drop("Survived", axis=1).copy()
```

---

### تمرين 5 (تمرين إضافي): مقارنة النماذج — table_fill

**السيناريو / المطلوب:**
أكمل جدول المقارنة بناءً على نتائج المحاضرة:

| النموذج | الدقة على `train` (%) | مؤشر الـ`Overfitting` |
| --- | --- | --- |
| `DecisionTreeClassifier` | _______ | _______ |
| `SVC` | _______ | _______ |
| `LogisticRegression` | _______ | _______ |
| `KNN (k=3)` | _______ | _______ |

**نموذج الحل:**

| النموذج | الدقة على `train` (%) | مؤشر الـ`Overfitting` |
| --- | --- | --- |
| `DecisionTreeClassifier` | 100.0 | مرتفع جداً (خطر `Overfitting`) |
| `SVC` | 94.95 | منخفض (الأفضل في هذا المثال) |
| `LogisticRegression` | 80.58 | منخفض (متوازن) |
| `KNN (k=3)` | 79.57 | منخفض (يعتمد على k) |

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين 1: تحليل تأثير `Embarked` على البقاء — written_analysis

**السيناريو:**
المعطيات: C=0.553، Q=0.389، S=0.336

**المطلوب:**
1. رتّب موانئ الصعود من الأعلى إلى الأقل نجاةً.
2. فسّر لماذا `C` (شيربورغ) لديه أعلى نسبة.
3. هل تُوصي باستخدام `Embarked` كميزة في النموذج؟ لماذا؟

**نموذج الحل:**
1. ترتيب النجاة: C (55.3%) > Q (38.9%) > S (33.6%).
2. ميناء `C` (شيربورغ-فرنسا) كان نقطة صعود الأثرياء من الأوروبيين الذين حجزوا الدرجة الأولى → ارتفاع نسبة البقاء مرتبط بالدرجة لا بالميناء مباشرة.
3. يمكن الاستفادة منه كميزة لكنها ذات ارتباط ضعيف مقارنة بـ`Sex` و`Pclass`. يُوصى بتضمينه بعد التحويل الرقمي.

---

### تمرين 2: تصميم خطوات `Feature Engineering` — table_fill

**السيناريو:** بيانات الراكب: `Name="Smith, Mr. John"`, `SibSp=2`, `Parch=1`, `Cabin="C23 C25"`, `Age=NaN`

**المطلوب:**
أكمل جدول التحولات:

| الميزة | القيمة الأصلية | التحويل | القيمة الجديدة |
| --- | --- | --- | --- |
| `Title` | "Smith, Mr. John" | `regex + mapping` | _______ |
| `cabin_multiple` | "C23 C25" | `split(' ')` | _______ |
| `FamilySize` | SibSp=2, Parch=1 | `2 + 1 + 1` | _______ |
| `IsAlone` | FamilySize=4 | `!= 1 → 0` | _______ |
| `Age` | NaN | عشوائي ± std | _______ |

**نموذج الحل:**

| الميزة | القيمة الأصلية | التحويل | القيمة الجديدة |
| --- | --- | --- | --- |
| `Title` | "Smith, Mr. John" | `"Mr" → mapping["Mr"] = 1` | **1** |
| `cabin_multiple` | "C23 C25" | `len(["C23","C25"]) = 2` | **2** |
| `FamilySize` | SibSp=2, Parch=1 | `2 + 1 + 1 = 4` | **4** |
| `IsAlone` | FamilySize=4 | `4 != 1 → 0` | **0** |
| `Age` | NaN | قريب من 30 ± 14 | **عشوائي ≈ 16–44** |

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: تحويل عمود `Age` إلى فئات

**المدخل:**
```python
ages = [5, 20, 35, 55, 70]
```

**تتبّع خطوة بخطوة (أكمل الجدول):**

| الراكب | عمره | الشرط | فئة `Age` الجديدة |
| --- | --- | --- | --- |
| A | 5 | `<= 16` | ؟ |
| B | 20 | `> 16 & <= 32` | ؟ |
| C | 35 | `> 32 & <= 48` | ؟ |
| D | 55 | `> 48 & <= 64` | ؟ |
| E | 70 | `> 64` | ؟ |

**نموذج الحل:**

| الراكب | عمره | الشرط | فئة `Age` الجديدة |
| --- | --- | --- | --- |
| A | 5 | `<= 16` | **0** (أطفال) |
| B | 20 | `> 16 & <= 32` | **1** (شباب) |
| C | 35 | `> 32 & <= 48` | **2** (بالغون) |
| D | 55 | `> 48 & <= 64` | **3** (كبار) |
| E | 70 | `> 64` | **4** (مسنّون) |

**النتيجة:** `[0, 1, 2, 3, 4]`

**سؤال إضافي (متوسط):** ماذا يحدث للراكب عمره 32؟
أ) يُصنَّف ضمن الفئة 1 (> 16 & <= 32)
ب) يُصنَّف ضمن الفئة 2 (> 32 & <= 48)
ج) يُصنَّف ضمن الفئة 0
د) لا يُصنَّف

**الإجابة: أ** — الشرط `<= 32` يشمل 32.

---

### تمرين تتبع 2: حساب `FamilySize` و `IsAlone`

**المدخل:**

| الراكب | SibSp | Parch |
| --- | --- | --- |
| P1 | 0 | 0 |
| P2 | 1 | 2 |
| P3 | 3 | 0 |
| P4 | 0 | 1 |

**أكمل الجدول:**

| الراكب | SibSp | Parch | FamilySize | IsAlone |
| --- | --- | --- | --- | --- |
| P1 | 0 | 0 | ؟ | ؟ |
| P2 | 1 | 2 | ؟ | ؟ |
| P3 | 3 | 0 | ؟ | ؟ |
| P4 | 0 | 1 | ؟ | ؟ |

**نموذج الحل:**

| الراكب | SibSp | Parch | FamilySize | IsAlone |
| --- | --- | --- | --- | --- |
| P1 | 0 | 0 | **1** | **1** (وحيد) |
| P2 | 1 | 2 | **4** | **0** (مع عائلة) |
| P3 | 3 | 0 | **4** | **0** (مع عائلة) |
| P4 | 0 | 1 | **2** | **0** (مع عائلة) |

**النتيجة:** فقط P1 (`FamilySize=1`) يُصنَّف `IsAlone=1`.

---

### تمرين تتبع 3: تدريب نموذج وتقييمه خطوة بخطوة

**المدخل:** `X_train` (891×8), `y_train` (891,), `X_test` (418×8)

**أكمل جدول خطوات التدريب:**

| الخطوة | العملية | الأداة | الناتج |
| --- | --- | --- | --- |
| 1 | إنشاء النموذج | `LogisticRegression()` | كائن `clf` غير مدرَّب |
| 2 | ؟ | `.fit(X_train, y_train)` | ؟ |
| 3 | ؟ | `.predict(X_test)` | ؟ |
| 4 | قياس الدقة | `.score(X_train, y_train)` | ؟ |
| 5 | تحويل الدقة لنسبة | `round(... * 100, 2)` | ؟ |

**نموذج الحل:**

| الخطوة | العملية | الأداة | الناتج |
| --- | --- | --- | --- |
| 1 | إنشاء النموذج | `LogisticRegression()` | كائن `clf` غير مدرَّب |
| 2 | **تدريب النموذج** | `.fit(X_train, y_train)` | **`clf` مدرَّب بأوزان محسوبة** |
| 3 | **توليد التنبؤات** | `.predict(X_test)` | **مصفوفة 0/1 بطول 418** |
| 4 | قياس الدقة | `.score(X_train, y_train)` | **0.8058 (كسر)** |
| 5 | تحويل الدقة لنسبة | `round(0.8058 * 100, 2)` | **80.58 (percent)** |

---

## الجزء الرابع: أسئلة تصميم

### سؤال تصميم 1: مخطط سير عملية `ML Pipeline` لتايتانيك

**المطلوب:**
ارسم مخططاً يُوضح الخطوات الكاملة من البيانات الخام إلى نموذج مُقيَّم في مشروع تايتانيك.

**نموذج الإجابة:**

#### ما هذا المخطط؟
> يُوضّح `Pipeline` مشروع `Machine Learning` الكامل من الإدخال إلى الإخراج.

#### وصف العُقد:
| # | العُقدة | النوع | الشرح |
| --- | --- | --- | --- |
| 1 | Raw CSV Data | process | البيانات الخام (train + test) |
| 2 | EDA | process | استكشاف البيانات والتصوير |
| 3 | Feature Engineering | process | إنشاء Title, FamilySize, IsAlone |
| 4 | Encoding | process | تحويل Sex, Embarked, Title لأرقام |
| 5 | Missing Values | process | معالجة Age, Fare, Embarked |
| 6 | Drop Columns | process | حذف Name, Ticket, Cabin… |
| 7 | Split X y | decision | فصل الميزات عن الهدف |
| 8 | Train Models | process | fit على X_train |
| 9 | Evaluate | process | score على X_train |
| 10 | Select Best | decision | اختيار النموذج الأفضل |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Raw CSV | EDA | يستكشف | → | قراءة وتحليل |
| EDA | Feature Engineering | يُرشد | → | الرؤى توجّه الميزات |
| Feature Engineering | Encoding | يُجهّز | → | تحويل النص لرقم |
| Encoding | Missing Values | يعالج | → | تعبئة الفراغات |
| Missing Values | Drop Columns | يُنظّف | → | حذف غير المفيد |
| Drop Columns | Split X y | يقسّم | → | فصل الميزات والهدف |
| Split X y | Train Models | يدرّب | → | تطبيق النماذج |
| Train Models | Evaluate | يقيّم | → | قياس الدقة |
| Evaluate | Select Best | يختار | → | أعلى دقة |

```diagram
type: flowchart
title: Titanic ML Pipeline
direction: TD
nodes:
  - id: raw
    label: Raw CSV Data
    kind: event
    level: 0
  - id: eda
    label: EDA & Visualization
    kind: process
    level: 1
  - id: fe
    label: Feature Engineering
    kind: process
    level: 2
  - id: enc
    label: Encoding & Mapping
    kind: process
    level: 3
  - id: miss
    label: Handle Missing Values
    kind: process
    level: 4
  - id: drop
    label: Drop Irrelevant Columns
    kind: process
    level: 5
  - id: split
    label: Split X_train / y_train / X_test
    kind: decision
    level: 6
  - id: train
    label: Train Multiple Models
    kind: process
    level: 7
  - id: eval
    label: Evaluate Accuracy
    kind: process
    level: 8
  - id: best
    label: Select Best Model
    kind: event
    level: 9
edges:
  - from: raw
    to: eda
    label: read_csv
    arrow: forward
  - from: eda
    to: fe
    label: insights
    arrow: forward
  - from: fe
    to: enc
    label: new features
    arrow: forward
  - from: enc
    to: miss
    label: numeric cols
    arrow: forward
  - from: miss
    to: drop
    label: filled
    arrow: forward
  - from: drop
    to: split
    label: clean data
    arrow: forward
  - from: split
    to: train
    label: X_train, y_train
    arrow: forward
  - from: train
    to: eval
    label: fitted models
    arrow: forward
  - from: eval
    to: best
    label: accuracy scores
    arrow: forward
```

**معايير التقييم:**
- تضمين جميع المراحل العشر بالترتيب الصحيح.
- التمييز بين مراحل المعالجة (`process`) ومراحل القرار (`decision`).
- وضع التسميات الصحيحة على الروابط.

---

### سؤال تصميم 2: تصميم جدول مقارنة النماذج

**المطلوب:**
صمّم جدولاً شاملاً لمقارنة النماذج السبعة المستخدمة في المحاضرة مع توصية مُبرَّرة.

**نموذج الإجابة:**

| النموذج | الدقة % | نوع النموذج | القرن | التعقيد | التوصية |
| --- | --- | --- | --- | --- | --- |
| `DecisionTree` | 100.0 | خطي/غير خطي | عمق كامل | منخفض | ❌ `Overfitting` |
| `SVC` | 94.95 | غير خطي | `RBF` | مرتفع | ✅ الأفضل هنا |
| `LinearSVC` | 80.81 | خطي | - | منخفض | 👍 سريع وجيد |
| `LogisticRegression` | 80.58 | خطي | - | منخفض | 👍 قابل للتفسير |
| `KNN (k=3)` | 79.57 | كسول | - | متوسط | 👌 مقبول |
| `GaussianNB` | 77.78 | احتمالي | - | منخفض | 👌 للبيانات الصغيرة |
| `Perceptron` | 61.95 | خطي بسيط | - | منخفض | ❌ ضعيف هنا |

**معايير التقييم:**
- تضمين جميع النماذج السبعة.
- الدقة الصحيحة لكل نموذج.
- تعليل التوصية بناءً على `Overfitting` واحتمال التعميم.

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما هدف مشروع تايتانيك في `Machine Learning`؟
A: التنبؤ بما إذا كان الراكب قد نجا (1) أم لا (0) استناداً إلى ميزاته — وهو `Binary Classification`.

**Q2:** ما الفرق بين `Training set` و `Test set`؟
A: `Training set` = البيانات التي يتعلّم منها النموذج. `Test set` = البيانات التي نختبر عليها قدرته على التعميم.

**Q3:** لماذا `describe(include=['O'])` ضروري؟
A: لأن `describe()` الافتراضي يعرض إحصاءات الأعمدة الرقمية فقط. إضافة `include=['O']` يُظهر إحصاءات الأعمدة النصية.

**Q4:** ما معنى `mean()` على عمود `Survived`؟
A: بما أن `Survived` يحتوي 0 و1 فقط، `mean = (عدد الـ1) / (إجمالي القيم)` = نسبة الناجين المئوية.

**Q5:** ما `Pearson r` وما نطاقه؟
A: مقياس للارتباط الخطي بين متغيّرَين. نطاقه [-1, 1]: قريب من 1 = ارتباط قوي إيجابي، قريب من -1 = عكسي قوي، قريب من 0 = لا ارتباط.

**Q6:** ما `Overfitting` وكيف نكشفه؟
A: النموذج يحفظ بيانات التدريب بدل التعلّم. نكشفه بمقارنة دقة `train` ودقة `test` — فارق كبير = `Overfitting`.

**Q7:** لماذا نستخدم `titanic_combined_data = [train, test]`؟
A: لتطبيق نفس التحويلات (`map`, `fillna`, `label encoding`) على كلا الجدولَين بحلقة `for` واحدة دون تكرار الكود.

**Q8:** ما الفرق بين `pd.cut()` و `pd.qcut()`؟
A: `pd.cut` يقسّم النطاق إلى فئات متساوية الحجم (المدى). `pd.qcut` يقسّم إلى فئات متساوية العدد (الربيعيات).

**Q9:** ما `FamilySize` وكيف تُحسب؟
A: `FamilySize = SibSp + Parch + 1`. تجمع عدد الإخوة والزوج (`SibSp`) وعدد الآباء والأطفال (`Parch`) ثم تُضيف الراكب نفسه.

**Q10:** ما `IsAlone` ومتى تكون قيمته 1؟
A: ميزة مشتقة تُشير لما إذا كان الراكب يسافر وحيداً. تكون 1 فقط عندما `FamilySize == 1`.

**Q11:** ما الفرق بين `SVC` و `LinearSVC` في نتائج التايتانيك؟
A: `SVC` استخدم `RBF kernel` وحقق 94.95%. `LinearSVC` خطي وحقق 80.81%. البيانات غير خطية فكان `SVC` أفضل.

**Q12:** لماذا تُملأ القيم المفقودة في `Age` بقيم عشوائية لا بالمتوسط؟
A: للحفاظ على التوزيع الطبيعي. ملء 177 قيمة بنفس المتوسط يُشوّه التوزيع ويخلق قمة مصطنعة.

**Q13:** ما الذي يُشير إليه `annot=True` في `sns.heatmap()`؟
A: يطبع قيمة معامل الارتباط داخل كل خلية في الـ`heatmap` بدلاً من الاعتماد على الألوان فقط.

**Q14:** ما نسبة الناجين في `titanic_train`؟
A: 342 من 891 = 38.4% نجوا. 549 = 61.6% لم ينجوا.

**Q15:** ما الأعمدة التي تُحذف من `titanic_train` قبل التدريب؟
A: `Name`, `SibSp`, `Parch`, `Ticket`, `Cabin`, `FamilySize`, `cabin_multiple`, `cabin_adv`, `numeric_ticket`, `ticket_letters`, `name_title`, `AgeBand`, `FareBand`.

**Q16:** ما الفرق بين `.fit()` و `.predict()`؟
A: `.fit(X_train, y_train)` = التدريب (تعلّم الأوزان). `.predict(X_test)` = التطبيق (توليد تنبؤات لبيانات جديدة).

**Q17:** ما معنى `split=True` في `sns.violinplot()`؟
A: يقسّم مخطط الكمان إلى نصفين: نصف للناجين ونصف للمتوفين، مما يسهل المقارنة البصرية.

**Q18:** لماذا `Embarked` يُملأ بـ`'S'` عند التعبئة؟
A: لأن `S` (Southampton) هي الأكثر شيوعاً — 644 راكباً مقابل 168 و77. القيمة المفقودة تُعامَل كحالة الأغلبية.

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### السؤال 1: ما `Feature Engineering` ولماذا نحتاجه في مشروع تايتانيك؟
**نموذج الإجابة:**
1. **التعريف:** عملية إنشاء أو تحويل الميزات الموجودة لإنتاج ميزات أكثر إفادة للنموذج.
2. **المكونات:** استخراج `Title` من `Name`، إنشاء `FamilySize` و`IsAlone`، تحويل `Cabin` وتقسيم `Age` و`Fare`.
3. **مثال:** `Name="Smith, Mr. John"` → `Title="Mr"` → رقم `1`. هذا أفيد من الاسم الكامل.
4. **متى نستخدم:** عندما تحتوي البيانات على معلومات مخفية في أعمدة نصية أو مركّبة.

---

### السؤال 2: ما `Pearson Correlation Coefficient` وكيف نفسّره؟
**نموذج الإجابة:**
1. **التعريف:** مقياس إحصائي للارتباط الخطي بين متغيّرَين ∈ [-1, 1].
2. **المكونات:** البسط = العلاقة المشتركة، المقام = تطبيع بالتشتّت.
3. **مثال:** `Survived` و`Pclass` = -0.34 (ارتباط عكسي متوسط).
4. **متى نستخدم:** قبل اختيار الميزات للنموذج لتحديد أي منها يرتبط بالهدف.

---

### السؤال 3: ما الفرق بين `Training set` و `Test set` ولماذا نحتاج كليهما؟
**نموذج الإجابة:**
1. **التعريف:** `Training set` = للتعلّم، `Test set` = للتقييم الموضوعي.
2. **المكونات:** في تايتانيك `train`= 891 صفاً، `test`= 418 صفاً.
3. **مثال:** نموذج `DecisionTree` دقته 100% على `train` لكن ستنخفض على `test`.
4. **متى نستخدم:** دائماً — التقييم على نفس بيانات التدريب غير موثوق.

---

### السؤال 4: ما `Overfitting` وكيف نتجنّبه؟
**نموذج الإجابة:**
1. **التعريف:** النموذج يحفظ بيانات التدريب بدلاً من تعلّم الأنماط العامة.
2. **المكونات:** دقة عالية على `train` + دقة منخفضة على `test` = `Overfitting`.
3. **مثال:** `DecisionTreeClassifier` بدقة 100% — يحفظ كل صف بدون تعميم.
4. **متى نستخدم:** نتجنّبه بتقليل عمق الشجرة، أو استخدام `cross-validation`، أو `regularization`.

---

### السؤال 5: اشرح استخدام `groupby()` مع `.mean()` لحساب نسبة البقاء.
**نموذج الإجابة:**
1. **التعريف:** `groupby()` يقسّم البيانات حسب قيم عمود، و`.mean()` يحسب المتوسط لكل مجموعة.
2. **المكونات:** `groupby('Pclass')` → 3 مجموعات. `.Survived.mean()` → نسبة 0/1 لكل مجموعة.
3. **مثال:** `Pclass=1` → 136 ناجٍ من 216 = `mean = 0.6296 = 62.96%`.
4. **متى نستخدم:** لتحليل علاقة متغيّر فئوي بالهدف الثنائي دون رسم.

---

### السؤال 6: ما `Binary Classification` وما مثاله في مشروع تايتانيك؟
**نموذج الإجابة:**
1. **التعريف:** تصنيف البيانات إلى فئتين حصراً (0 أو 1).
2. **المكونات:** ميزات المدخل (X) + هدف ثنائي (y ∈ {0,1}) + نموذج + دقة.
3. **مثال:** `Survived=0` (توفّي) أو `Survived=1` (نجا).
4. **متى نستخدم:** أمراض: نعم/لا، بريد إلكتروني: سبام/غير سبام، معاملة: احتيال/سليمة.

---

### السؤال 7: ما `pivot_table` وكيف تختلف عن `groupby`؟
**نموذج الإجابة:**
1. **التعريف:** `pd.pivot_table` يُنشئ ملخصاً على بُعدَين (صفوف وأعمدة) مع دالة تجميع.
2. **المكونات:** `index=` (الصفوف) + `columns=` (الأعمدة) + `values=` + `aggfunc=`.
3. **مثال:** `index="Survived", columns="Pclass", values="Ticket", aggfunc="count"` = جدول متقاطع.
4. **متى نستخدم:** عندما تريد تقاطع متغيّرَين — `groupby` أحادي البُعد، `pivot_table` ثنائي.

---

### السؤال 8: ما الهدف من `lambda` في `Feature Engineering`؟
**نموذج الإجابة:**
1. **التعريف:** `lambda` دالة مجهولة قصيرة تُكتب في سطر واحد.
2. **المكونات:** `lambda x: expression` — تأخذ مدخلاً وتُرجع تعبيراً.
3. **مثال:** `lambda x: 0 if pd.isna(x) else len(x.split(' '))` — تُحسب عدد الكبائن.
4. **متى نستخدم:** مع `.apply()` لتطبيق دالة بسيطة على كل قيمة في عمود.

---

### السؤال 9: اشرح `.map()` في تحويل `Sex` و`Title` إلى أرقام.
**نموذج الإجابة:**
1. **التعريف:** `.map(dict)` يستبدل كل قيمة في `Series` بالقيمة المقابلة في القاموس.
2. **المكونات:** قاموس Python {القيمة الأصلية: القيمة الجديدة} + `Series`.
3. **مثال:** `Sex.map({'female': 1, 'male': 0})` → `'female'` يصبح `1`.
4. **متى نستخدم:** عند وجود متغيّر نصي ذو قيم محدودة يجب تحويلها لأرقام قبل النمذجة.

---

### السؤال 10: ما الفرق بين `KNeighborsClassifier` و `LogisticRegression` في `sklearn`؟
**نموذج الإجابة:**
1. **التعريف:** `KNN` = يُصنّف نقطة بحسب أصوات أقرب K جيران. `LogReg` = يتعلّم حداً فاصلاً خطياً.
2. **المكونات:** `KNN`: `n_neighbors=k` هو الوحيد المعامل. `LogReg`: يتعلّم أوزاناً للميزات.
3. **مثال:** `KNN(k=3)` = 79.57%، `LogReg` = 80.58% في تايتانيك.
4. **متى نستخدم:** `KNN` بيانات صغيرة وغير خطية. `LogReg` بيانات كبيرة مع تفسيرية عالية.

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين `Training set` و `Test set` وأهمية الفصل بينهما.
- [ ] أفهم لماذا `mean()` على عمود 0/1 يُعطي نسبة البقاء مباشرة.
- [ ] أستطيع حساب `Pearson r` يدوياً باستخدام الجدول والصيغة.
- [ ] أفهم ماذا يعني معامل ارتباط سالب (مثل `Pclass` = -0.34).
- [ ] أعرف الفرق بين `pd.cut()` و `pd.qcut()` ومتى أستخدم كلاً منهما.
- [ ] أستطيع كتابة كود `groupby().mean()` لحساب نسبة البقاء لأي فئة.
- [ ] أفهم ما `Overfitting` وكيف أكشفه (دقة 100% على `train`).
- [ ] أعرف وظيفة `.fit()` و `.predict()` و `.score()` في `sklearn`.
- [ ] أستطيع شرح عملية `Feature Engineering` الكاملة في تايتانيك.
- [ ] أعرف الفرق بين `SVC` و `LinearSVC` وأي النموذجَين أفضل هنا.
- [ ] أفهم لماذا نستخدم `titanic_combined_data = [train, test]`.
- [ ] أستطيع حساب `FamilySize` و `IsAlone` وأفسّر نتائجهما.
- [ ] أعرف كيف نستخرج `Title` من `Name` باستخدام `regex`.
- [ ] أفهم `pivot_table` وكيف تختلف عن `groupby`.
- [ ] أستطيع قراءة مخطط `violinplot` و `heatmap` وتفسير نتائجهما.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| محاضرة 10 (هذه) | `pandas` + `seaborn` | تحليل البيانات والتصوير |
| محاضرة 10 (هذه) | `sklearn` | النمذجة والتقييم |
| محاضرات EDA السابقة | هذه المحاضرة | يُبنى عليها في مرحلة التحليل |

---

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| `Binary Classification` | `Survived ∈ {0,1}` → `mean = survival rate` |
| `Pearson r` | [-1,1] — سالب=عكسي, موجب=طردي |
| `Overfitting` | دقة 100% على train = خطر |
| `Feature Engineering` | `Title`, `FamilySize`, `IsAlone`, `AgeBand`, `FareBand` |
| أفضل نموذج | `SVC` بـ94.95% في هذا المشروع |

---

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `.fit(X,y)` | تدريب النموذج | جميع نماذج `sklearn` |
| `.predict(X)` | توليد تنبؤات | بعد التدريب |
| `.score(X,y)` | حساب الدقة | تقييم النموذج |
| `.groupby().mean()` | نسبة بقاء لكل فئة | `EDA` |
| `pd.cut()` | تقسيم بنطاق متساوٍ | `AgeBand` |
| `pd.qcut()` | تقسيم بعدد متساوٍ | `FareBand` |
| `.fillna()` | تعبئة القيم المفقودة | معالجة البيانات |
| `.map(dict)` | تحويل فئوي لرقمي | `Sex`, `Embarked`, `Title` |
| `.apply(lambda)` | تطبيق دالة على كل قيمة | `cabin_multiple`, `ticket_letters` |
| `annot=True` | إظهار الأرقام في `heatmap` | `sns.heatmap()` |
| `split=True` | نصفَين في `violinplot` | `sns.violinplot()` |
| `col='col'` | لوحات فرعية لكل فئة | `sns.catplot()` |

---

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | دائماً افحص القيم المفقودة بـ `.isnull().sum()` قبل البدء |
| 2 | طبّق نفس التحويلات على `train` و `test` معاً |
| 3 | دقة 100% على `train` = `Overfitting` لا نموذج ممتاز |
| 4 | `mean()` على عمود 0/1 = نسبة الحادثة مباشرة |
| 5 | احذف الأعمدة التي لا تُساهم إحصائياً (`PassengerId`, `Name`…) |
| 6 | اختبر النموذج على `X_test` لا على `X_train` |

---

<!-- VALIDATION
schema: 1.0
parts: integration_map, detail, summary, mcq, debug, exercise, analysis_exercise, trace_exercise, design_question, qa_cards, theory, self_check, cheat_sheet
mcq_count: 16
code_blocks: 22
-->
