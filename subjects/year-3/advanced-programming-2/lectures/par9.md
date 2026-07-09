# المحاضرة 9 — Introduction to Machine Learning (مقدمة في تعلم الآلة)

> **المادة:** البرمجة المتقدمة 2 (القسم النظري) | **الموضوع:** الانحدار الخطي البسيط والمتعدد، إحصاء الاستدلال، معالجة البيانات بـ `pandas`

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| أساسيات Python | متغيرات، دوال، حلقات | قواعد الكتابة |
| البرمجة الكائنية | `class`، `inheritance` | هيكل البرامج |
| تحليل البيانات | `pandas`، `numpy`، `matplotlib` | تنظيف وعرض البيانات |
| الإحصاء الاستدلالي | `mean`، `std`، `p-value`، `t-test` | قياس العلاقات |
| **← أنت هنا** | `Linear Regression`، `OLS`، `seaborn`، `scipy.stats` | **نماذج تنبؤية من الصفر** |
| تعلم الآلة المتقدم | `scikit-learn`، `LogisticRegression`، `SVM` | نماذج جاهزة |

---

## الجزء الأول: الشرح التفصيلي

### 1. مقدمة — ما هو تعلم الآلة؟

**النص الأصلي يقول:** عنوان المحاضرة "Introduction to Machine Learning"

**الشرح المبسّط:**
`Machine Learning` هو مجال من مجالات الذكاء الاصطناعي يهدف إلى تعليم الحاسوب كيفية **التعلم من البيانات** بدلاً من برمجة قواعد ثابتة له. الفكرة: أعطِ الجهاز بيانات تاريخية، فيتعلم منها نمطاً، ثم يستخدمه للتنبؤ ببيانات جديدة.

#### 💡 التشبيه:
> تخيّل طالباً يدرس أمثلة كثيرة من الاختبارات القديمة (بيانات التدريب)، ثم يُجيب على امتحان جديد لم يره من قبل.
> **وجه الشبه:** الأمثلة القديمة = `training data`، الامتحان الجديد = `test data`، الطالب = النموذج `model`.

---

### 2. الانحدار الخطي البسيط — Simple Linear Regression

**النص الأصلي يقول:** جدول رواتب الموظفين (الخبرة → الراتب)، مع حساب `slope` و`intercept` يدوياً

**الشرح المبسّط:**
`Simple Linear Regression` هو نموذج يصف علاقة **متغيرَين**: متغير مستقل `x` ومتغير تابع `y`، بمعادلة خط مستقيم:

#### 📐 المعادلة: معادلة الخط

$$
\hat{y} = B_1 \cdot x + B_0
$$

**الشرح:**
> - `ŷ` = القيمة المتوقعة (Predicted value)
> - `B_1` = الميل (Slope) — كم يتغير `y` عند زيادة `x` بوحدة واحدة
> - `B_0` = نقطة التقاطع (Intercept) — قيمة `y` عندما `x = 0`

#### 📐 المعادلة: حساب الميل B₁ (OLS)

$$
B_1 = \frac{\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y})}{\sum_{i=1}^{n}(x_i - \bar{x})^2}
$$

**الشرح:**
> - `x_i` = قيمة المتغير المستقل للصف `i`
> - `ȳ` = المتوسط الحسابي لـ `y`
> - `x̄` = المتوسط الحسابي لـ `x`
> - البسط = التغاير (Covariance) المرجّح
> - المقام = تباين `x` (Variance)

#### 📐 المعادلة: حساب نقطة التقاطع B₀

$$
B_0 = \bar{y} - B_1 \cdot \bar{x}
$$

**الشرح:**
> - `ȳ` = متوسط `y`
> - `x̄` = متوسط `x`
> - بعد إيجاد `B_1`، نحصل على `B_0` مباشرة

#### 2.1 البيانات المستخدمة (جدول الرواتب)

**النص الأصلي يقول:** جدول الموظفين (الخبرة بالسنوات — الراتب)

| i | الخبرة (`x`) | الراتب (`y`) |
| --- | --- | --- |
| 1 | 1 | 3500 |
| 2 | 2 | 3800 |
| 3 | 3 | 4200 |
| 4 | 4 | 4500 |
| 5 | 5 | 4700 |
| 6 | 6 | 5100 |

#### 💻 الكود: حساب Slope و Intercept يدوياً

**ما هذا الكود؟**
> يحسب معاملَي الانحدار الخطي (`B1` الميل و`B0` نقطة التقاطع) من الصفر باستخدام معادلة `OLS` بدون أي مكتبة `ML` جاهزة.

```python
import numpy as np

# Define x (experience) and y (salary)
x = np.array([1, 2, 3, 4, 5, 6])
y = np.array([3500, 3800, 4200, 4500, 4700, 5100])

# Calculate number of data points
n = len(x)

# Calculate means
x_mean = np.mean(x)
y_mean = np.mean(y)

# Numerator: sum of (xi - x_mean) * (yi - y_mean)
numerator = np.sum((x - x_mean) * (y - y_mean))

# Denominator: sum of (xi - x_mean)^2
denominator = np.sum((x - x_mean) ** 2)

# Slope B1
slope = numerator / denominator

# Intercept B0 = mean(y) - B1 * mean(x)
intercept = y_mean - slope * x_mean

print(f"(Slope): {slope:.2f}")
print(f"(Intercept): {intercept:.2f}")
```

#### شرح كل سطر:
1. `x = np.array([1, 2, 3, 4, 5, 6])` → تعريف متغير الخبرة كمصفوفة `numpy`
2. `y = np.array([3500, ...])` → تعريف متغير الراتب كمصفوفة `numpy`
3. `n = len(x)` → عدد نقاط البيانات (6 موظفين)
4. `x_mean = np.mean(x)` → حساب متوسط `x` = 3.5
5. `y_mean = np.mean(y)` → حساب متوسط `y` = 4300
6. `numerator = np.sum((x - x_mean) * (y - y_mean))` → بسط معادلة `B1` (التغاير)
7. `denominator = np.sum((x - x_mean) ** 2)` → مقام معادلة `B1` (تباين `x`)
8. `slope = numerator / denominator` → `B1` = 314.29 تقريباً
9. `intercept = y_mean - slope * x_mean` → `B0` = 3200 تقريباً

**المكتبات المطلوبة (Imports):**
> `import numpy as np`

**الناتج المتوقع (لقطة الشاشة):**
> ```
> (Slope): 314.29
> (Intercept): 3200.00
> ```

#### 💡 التشبيه:
> الميل `B1` يشبه سرعة سيارة: إذا كانت السرعة 314 كم/ساعة، فكل ساعة إضافية من الخبرة تضيف 314 ريالاً للراتب.
> **وجه الشبه:** السرعة = `slope`، المسافة المقطوعة = `y`، الزمن = `x`.

#### 🤔 تفعيل الفهم:
> **سؤال:** لماذا نحسب `B0` بعد `B1` وليس العكس؟
> **لأن** `B0` يعتمد رياضياً على `B1` في معادلته (`B0 = ȳ - B1 * x̄`)، فلا يمكن حسابه قبل معرفة `B1`.

---

### 3. قياس جودة النموذج — Error Metrics

**النص الأصلي يقول:** حساب `residuals`، `RSS`، `MSE`، `stderr_slope`

**الشرح المبسّط:**
بعد بناء النموذج، يجب قياس مدى دقته. أدوات القياس:

| المقياس | الاسم الكامل | ماذا يقيس؟ |
| --- | --- | --- |
| `Residual` | الخطأ | الفرق بين القيمة الحقيقية والمتوقعة `(y - ŷ)` |
| `RSS` | Residual Sum of Squares | مجموع مربعات كل الأخطاء |
| `MSE` | Mean Squared Error | متوسط مربعات الأخطاء (بقسمة `n-2`) |
| `stderr_slope` | Standard Error of Slope | الخطأ المعياري لتقدير الميل |

#### 📐 المعادلة: RSS و MSE

$$
RSS = \sum_{i=1}^{n}(y_i - \hat{y}_i)^2
$$

$$
MSE = \frac{RSS}{n-2}
$$

**الشرح:**
> - نقسم على `n-2` وليس `n` لأن لدينا معاملَين مقدَّرَين (`B0` و`B1`) يستهلكان درجتَي حرية
> - `MSE` صغير = نموذج أدق

#### 📐 المعادلة: الخطأ المعياري للميل

$$
SE_{B_1} = \sqrt{\frac{MSE}{\sum(x_i - \bar{x})^2}}
$$

**الشرح:**
> - `SE_{B1}` = مقدار تذبذب تقدير الميل عبر عينات مختلفة
> - صغير = تقدير موثوق للميل

#### 💻 الكود: حساب مقاييس الخطأ

**ما هذا الكود؟**
> يحسب القيم المتوقعة، الأخطاء `residuals`، وثلاثة مقاييس جودة النموذج: `RSS`، `MSE`، `stderr_slope`.

```python
import numpy as np

# Predicted values using the regression line
y_pred = slope * x + intercept

# Residuals: actual - predicted
residuals = y - y_pred

# Display each employee's actual vs predicted salary
for i, res in enumerate(residuals):
    print(f"employee {i+1}: actual_salary {y[i]}, "
          f"prediction_salary {y_pred[i]:.2f}, "
          f"error {res:.2f}")

# RSS: Residual Sum of Squares (total squared error)
rss = np.sum(residuals ** 2)

# MSE: Mean Squared Error (n-2 because we estimated 2 parameters)
mse = rss / (n - 2)

# x_variance: sum of (xi - x_mean)^2
x_variance = np.sum((x - x_mean) ** 2)

# Standard error of the slope
stderr_slope = np.sqrt(mse / x_variance)

print(f"مجموع مربعات الأخطاء (RSS): {rss:.2f}")
print(f"متوسط مربعات الأخطاء (MSE): {mse:.2f}")
print(f"الخطأ المعياري للميل: {stderr_slope:.4f}")
```

#### شرح كل سطر:
1. `y_pred = slope * x + intercept` → تطبيق معادلة الخط على كل قيمة `x`
2. `residuals = y - y_pred` → الفرق الحقيقي لكل موظف
3. حلقة `for` → طباعة مقارنة تفصيلية لكل موظف
4. `rss = np.sum(residuals ** 2)` → تربيع الأخطاء ثم جمعها (لتجنب إلغاء السالب بالموجب)
5. `mse = rss / (n - 2)` → القسمة على `n-2` (درجات الحرية = 4)
6. `x_variance = np.sum((x - x_mean)**2)` → تباين `x` (مقام `B1`)
7. `stderr_slope = np.sqrt(mse / x_variance)` → الجذر التربيعي لنسبة `MSE` على تباين `x`

**الناتج المتوقع (لقطة الشاشة):**
> ```
> employee 1: actual_salary 3500, prediction_salary 3514.29, error -14.29
> employee 2: actual_salary 3800, prediction_salary 3828.57, error -28.57
> employee 3: actual_salary 4200, prediction_salary 4142.86, error 57.14
> employee 4: actual_salary 4500, prediction_salary 4457.14, error 42.86
> employee 5: actual_salary 4700, prediction_salary 4771.43, error -71.43
> employee 6: actual_salary 5100, prediction_salary 5085.71, error 14.29
> مجموع مربعات الأخطاء (RSS): 11428.57
> متوسط مربعات الأخطاء (MSE): 2857.14
> الخطأ المعياري للميل: 12.7775
> ```

---

### 4. اختبار t — T-test for the Slope

**النص الأصلي يقول:** حساب `t_stat`، `p-value` بطريقتين (`sf` و`CDF`)

**الشرح المبسّط:**
هل الميل `B1` مختلف فعلاً عن الصفر؟ أم ربما العلاقة وهمية (ناتجة عن الصدفة)؟  
نختبر هذا عبر `t-test`:

- **H₀:** `B1 = 0` (لا علاقة بين `x` و`y`)
- **H₁:** `B1 ≠ 0` (توجد علاقة حقيقية)

#### 📐 المعادلة: إحصاءة t

$$
t = \frac{B_1}{SE_{B_1}}
$$

**الشرح:**
> - `B1` = الميل المحسوب
> - `SE_B1` = الخطأ المعياري للميل
> - كلما كبرت قيمة `|t|`، كلما كانت العلاقة أقوى وأكثر إحصائية

#### 💻 الكود: حساب t-statistic و p-value

**ما هذا الكود؟**
> يحسب إحصاءة `t` ثم يحوّلها لـ`p-value` بطريقتين: مباشرة عبر `sf` وعبر `CDF`.

```python
from scipy.stats import t

# t-statistic = slope / standard error of slope
t_stat = slope / stderr_slope
print(f"إحصائية t: {t_stat:.4f}")

# Degrees of freedom = n - 2
dfree = n - 2  # = 4

# Method 1: Using survival function sf = 1 - cdf (right tail)
p_value_direct = 2 * t.sf(np.abs(t_stat), dfree)

# Method 2: Using CDF manually
cdf_at_t = t.cdf(t_stat, dfree)        # area to the left
right_tail = 1 - cdf_at_t              # area in right tail
p_value_manual = 2 * right_tail        # two-tailed test

print(f"value CDF for t = {t_stat:.4f}: {cdf_at_t:.6f}")
print(f"space in right side : {right_tail:.6f}")
print(f"p-value (اختبار ثنائي الطرف): {p_value_manual:.6f}")
print(f"p-value (مباشرة sf): {p_value_direct:.6f}")
```

#### شرح كل سطر:
1. `from scipy.stats import t` → استيراد توزيع `t` من `scipy`
2. `t_stat = slope / stderr_slope` → `24.5967` (قيمة كبيرة جداً = علاقة قوية)
3. `dfree = n - 2` → درجات الحرية = 4
4. `p_value_direct = 2 * t.sf(np.abs(t_stat), dfree)` → الطريقة الأولى: مباشرة من الذيل الأيمن (`sf = 1 - CDF`)
5. `cdf_at_t = t.cdf(t_stat, dfree)` → المساحة يسار `t`
6. `right_tail = 1 - cdf_at_t` → المساحة يمين `t`
7. `p_value_manual = 2 * right_tail` → ضرب في 2 للاختبار ثنائي الطرف

**المكتبات المطلوبة (Imports):**
> `from scipy.stats import t`
> `import numpy as np`

**الناتج المتوقع (لقطة الشاشة):**
> ```
> إحصائية t: 24.5967
> value CDF for t = 24.5967: 0.999992
> space in right side : 0.000008
> p-value (اختبار ثنائي الطرف): 0.000016
> p-value (مباشرة sf): 0.000016
> ```

#### مهم للامتحان ⚠️:
> `p-value = 0.000016 < 0.05`، إذن نرفض `H₀` ونستنتج أن العلاقة بين الخبرة والراتب **إحصائية دالة** وليست صدفة.

#### ⚖️ المقايضة: طريقتا حساب p-value

| | `sf` مباشرة | `CDF` يدوياً |
| --- | --- | --- |
| المزايا | سطر واحد، أقل خطأً | تفهم ما يحدث خطوة بخطوة |
| العيوب | صندوق أسود | خطوات إضافية |
| متى تختاره | الإنتاج | التعلم والفهم |

---

### 5. تحميل بيانات حقيقية — Tips Dataset

**النص الأصلي يقول:** قراءة ملف `tips.csv`، استعراضه بـ `df.info()` و `df`

**الشرح المبسّط:**
ننتقل من بيانات صغيرة (6 موظفين) إلى بيانات حقيقية (244 صفاً). `tips.csv` هو مجموعة بيانات إكراميات المطعم.

#### 💻 الكود: تحميل البيانات

**ما هذا الكود؟**
> يحمّل ملف `CSV` ويعرض معلومات أساسية عنه.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Load the tips dataset from local path
df = pd.read_csv("d:/datasets/tips.csv")

# Display basic info: columns, types, non-null counts
df.info()
```

#### شرح كل سطر:
1. `import pandas as pd` → مكتبة معالجة البيانات
2. `import numpy as np` → مكتبة الحسابات العددية
3. `import matplotlib.pyplot as plt` → مكتبة الرسم البياني
4. `df = pd.read_csv(...)` → قراءة ملف `CSV` إلى `DataFrame`
5. `df.info()` → عرض: عدد الصفوف، أسماء الأعمدة، أنواع البيانات، عدد القيم غير الفارغة

**الناتج المتوقع (لقطة الشاشة):**
> ```
> <class 'pandas.core.frame.DataFrame'>
> RangeIndex: 244 entries, 0 to 243
> Data columns (total 7 columns):
>  #   Column      Non-Null Count  Dtype
> ---  ------      --------------  -----
>  0   total_bill  244 non-null    float64
>  1   tip         244 non-null    float64
>  2   sex         244 non-null    object
>  3   smoker      244 non-null    object
>  4   day         244 non-null    object
>  5   time        244 non-null    object
>  6   size        244 non-null    int64
> ```

| العمود | النوع الأصلي | المعنى |
| --- | --- | --- |
| `total_bill` | `float64` | إجمالي الفاتورة |
| `tip` | `float64` | الإكرامية |
| `sex` | `object` (نصي) | جنس الدافع |
| `smoker` | `object` (نصي) | هل يدخن؟ |
| `day` | `object` (نصي) | اليوم |
| `time` | `object` (نصي) | الوجبة (غداء/عشاء) |
| `size` | `int64` | عدد الأشخاص |

---

### 6. تحويل البيانات النصية — Label Encoding

**النص الأصلي يقول:** تحويل `sex`، `smoker`، `day`، `time` من نصوص إلى أرقام بـ `.map()`

**الشرح المبسّط:**
خوارزميات `ML` تتعامل مع أرقام فقط، لا نصوص. يجب تحويل الفئات النصية إلى أرقام (`Label Encoding`).

#### 💡 التشبيه:
> تحويل `Male → 1` و`Female → 2` يشبه ما تفعله بطاقة الهوية: تعطي كل شخص رقماً فريداً بدلاً من اسم طويل.
> **وجه الشبه:** الاسم النصي = `Male`، الرقم = `1`، `mapping` = سجل الأرقام.

#### 💻 الكود: تحويل جميع الأعمدة النصية

**ما هذا الكود؟**
> يستبدل القيم النصية في الأعمدة الفئوية بأرقام صحيحة باستخدام `dictionary mapping`.

```python
# Encode sex: Male=1, Female=2
mapping = {'Male': 1, 'Female': 2}
df['sex'] = df['sex'].map(mapping)

# Encode smoker: No=0, Yes=1
mapping = {'No': 0, 'Yes': 1}
df['smoker'] = df['smoker'].map(mapping)

# Encode day: Thur=1, Fri=2, Sat=3, Sun=4
mapping = {'Thur': 1, 'Fri': 2, 'Sat': 3, 'Sun': 4}
df['day'] = df['day'].map(mapping)

# Encode time: Lunch=1, Dinner=2
mapping = {'Lunch': 1, 'Dinner': 2}
df['time'] = df['time'].map(mapping)

df
```

#### شرح كل سطر:
1. `mapping = {'Male': 1, 'Female': 2}` → قاموس التحويل
2. `df['sex'] = df['sex'].map(mapping)` → تطبيق القاموس على عمود `sex`، كل `Male` يصبح `1`
3. تكرار نفس المنطق لـ `smoker`، `day`، `time`

**🔄 قبل / بعد: تحويل عمود sex**

**قبل:**
```python
# sex column contains text
# 'Female', 'Male', 'Female', ...
```

**بعد:**
```python
# sex column contains numbers
# 2, 1, 2, ...
```

**ماذا تغيّر؟** الأعمدة النصية الأربعة أصبحت أرقاماً يمكن للنموذج معالجتها.

#### نقطة مهمة ⚠️:
> ترقيم `day` (الأيام) له معنى ترتيبي: `Thur=1` أقدم أو أول الأسبوع. لكن `sex` ليس له ترتيب — `Male=1, Female=2` اختياري تماماً. للبيانات غير المرتبة، يُفضَّل `One-Hot Encoding` في المشاريع الاحترافية (غير مشروحة في المحاضرة).

---

### 7. الإحصاء الوصفي — Descriptive Statistics

**النص الأصلي يقول:** `df.describe()` و رسم التوزيعات (histograms)

**الشرح المبسّط:**
`df.describe()` يعطي لمحة سريعة عن كل عمود رقمي: العدد، المتوسط، الانحراف، الأدنى، الربيعيات، الأقصى.

#### 💻 الكود: الإحصاء الوصفي

**ما هذا الكود؟**
> يعرض ملخصاً إحصائياً لجميع الأعمدة الرقمية في البيانات.

```python
# Summary statistics for all numeric columns
df.describe()
```

**الناتج المتوقع (لقطة الشاشة):**
> جدول يحتوي `count`، `mean`، `std`، `min`، `25%`، `50%`، `75%`، `max` لكل عمود.
> مثلاً: متوسط `total_bill` ≈ 19.79، متوسط `tip` ≈ 3.0

---

### 8. تحويل لوغاريتمي — Log Transformation

**النص الأصلي يقول:** صورة توضح توزيع `total_bill` و`tip` قبل وبعد `Log transformation`

**الشرح المبسّط:**
كثير من خوارزميات `ML` تفترض أن البيانات تتبع التوزيع الطبيعي (`Normal Distribution`). إذا كانت البيانات منحرفة (`skewed`)، يُطبَّق `Log Transformation` لتقريبها من التوزيع الطبيعي.

#### 💡 التشبيه:
> `Log Transformation` كالتكبير على الجزء الصغير من صورة ملتقطة من بُعد — يجعل التفاصيل الصغيرة أوضح.
> **وجه الشبه:** التفاصيل = القيم الصغيرة، التكبير = `log`، الصورة = توزيع البيانات.

#### 🖼️ وصف الشاشة: صور التحويل اللوغاريتمي

> **الصفحة/الشريحة:** 14
> **ملاحظة:** لا يمكن عرض لقطة الشاشة في الموقع — الوصف التالي يغطي كل عنصر.

| العنصر | الموقع | الوظيفة |
| --- | --- | --- |
| `Total Bill Before` | أعلى يسار | رسم بياني للبيانات الأصلية — منحرف يميناً |
| `Total Bill after` | أعلى يمين | بعد `log` — أكثر تماثلاً |
| `Tips Values Before` | أسفل يسار | إكراميات أصلية — منحرفة |
| `Tips Values After` | أسفل يمين | إكراميات بعد `log` — أكثر انتشاراً |

---

### 9. رسم الانتشار — Scatter Plot مع seaborn

**النص الأصلي يقول:** `sns.relplot` للرسم حسب `sex`

**الشرح المبسّط:**
`seaborn` مكتبة رسم متقدمة تُبنى على `matplotlib`، تتيح تصوير العلاقات بين المتغيرات بسهولة.

#### 💻 الكود: رسم scatter مع تمييز الجنس

**ما هذا الكود؟**
> يرسم مخطط انتشار بين `total_bill` و`tip` مع تمييز الجنس باللون والشكل.

```python
import seaborn as sns

# Set dark grid style with Set2 color palette
sns.set_theme(style='darkgrid', palette='Set2')

# Relational plot: total_bill (x) vs tip (y), color and shape by sex
sns.relplot(data=df, x='total_bill', y="tip", hue='sex', style='sex')

plt.show()
```

#### شرح كل سطر:
1. `import seaborn as sns` → استيراد مكتبة `seaborn`
2. `sns.set_theme(style='darkgrid', palette='Set2')` → تطبيق نمط بصري موحد
3. `sns.relplot(data=df, x='total_bill', y="tip", hue='sex', style='sex')` → رسم انتشار حيث `hue` يميّز بالألوان و`style` بالشكل
4. `plt.show()` → عرض الرسم

**المكتبات المطلوبة (Imports):**
> `import seaborn as sns`
> `import matplotlib.pyplot as plt`

---

### 10. الانحدار الخطي على البيانات الحقيقية — Tips Regression

**النص الأصلي يقول:** رسم خط الانحدار بـ `sns.lmplot` مع التعليقات `annotate`

**الشرح المبسّط:**
`sns.lmplot` يرسم خط الانحدار تلقائياً مع نطاق الثقة `confidence interval` (المنطقة المظللة).

#### 💻 الكود: رسم خط الانحدار مع المعاملات

**ما هذا الكود؟**
> يرسم خط الانحدار ويكتب فوقه معادلة الخط ومعامل الارتباط وقيمة `p-value`.

```python
from scipy import stats

# Create lmplot: regression line of total_bill vs tip
g = sns.lmplot(data=df, x='total_bill', y='tip')

# Annotate function: adds regression stats as text on the plot
def annotate(data, **kws):
    # Compute regression stats using scipy
    slope, intercept, r, p, std_err = stats.linregress(
        data['total_bill'], data['tip']
    )
    ax = plt.gca()
    # Add text with slope, intercept, r, p, std_err
    ax.text(
        0.05, 0.8,
        f': y={slope:.3f}x+{intercept:.3f}, r={r:.3f}, p={p:.2g}, std_err={std_err:.3f}',
        transform=ax.transAxes
    )

# Apply annotate to the plot
g.map_dataframe(annotate)
plt.show()
```

#### شرح كل سطر:
1. `g = sns.lmplot(data=df, x='total_bill', y='tip')` → يرسم الانتشار + خط الانحدار + نطاق الثقة
2. `def annotate(data, **kws)` → دالة لإضافة نص المعادلة على الرسم
3. `stats.linregress(data['total_bill'], data['tip'])` → تحسب `slope, intercept, r, p, std_err` دفعة واحدة
4. `ax.text(0.05, 0.8, ...)` → يكتب النص في الموقع (5%, 80%) من الرسم
5. `g.map_dataframe(annotate)` → يطبق الدالة على بيانات الرسم

**الناتج المتوقع (لقطة الشاشة):**
> رسم انتشار أخضر مع خط انحدار ونص:
> `: y=0.105x+0.920, r=0.676, p=6.7e-34, std_err=0.007`

#### مهم للامتحان ⚠️:
> - `r = 0.676` → ارتباط موجب متوسط إلى قوي
> - `p = 6.7e-34` → أصغر بكثير من `0.05` → العلاقة دالة إحصائياً

---

### 11. حساب الانحدار يدوياً على Tips — Manual Regression

**النص الأصلي يقول:** كود طويل يحسب `b1`، `b0`، `covariance`، `correlation`، `stderr`، `t_value`، `p_value_d`

**الشرح المبسّط:**
تطبيق نفس منطق بيانات الرواتب ولكن على `DataFrame` حقيقي.

#### 💻 الكود: حساب يدوي للانحدار على Tips

**ما هذا الكود؟**
> يحسب من الصفر معاملات الانحدار، التغاير، الارتباط، الخطأ المعياري، وإحصاءة `t` ثم `p-value`.

```python
import math
from scipy.stats import t

# Calculate means
mean_total_bill = df['total_bill'].mean()
mean_tip = df['tip'].mean()

# Calculate deviations from mean
diff_totalbill = df['total_bill'] - mean_total_bill
diff_tip = df['tip'] - mean_tip

# B1 = covariance(x,y) / variance(x)
b1 = sum(diff_totalbill * diff_tip) / sum(diff_totalbill * diff_totalbill)
print("b1 value:  ", b1)

# B0 = mean(y) - B1 * mean(x)
b0 = mean_tip - b1 * mean_total_bill
print("b0 value:  ", b0)
print("y = ", b1, "*x + ", b0)

# Covariance and Correlation
cov_v = df['total_bill'].cov(df['tip'])
corr_v = df['total_bill'].corr(df['tip'])
print("covariance total_bill and tips:", cov_v)
print("correlation total_bill and tips:", corr_v)

# Prediction error (residuals)
prediction = df['tip'] - (b1 * df['total_bill'] + b0)

# Standard error of slope: sqrt(sum(residuals^2) / (n-2) / sum(diff_x^2))
stderr = math.sqrt(
    sum(prediction * prediction) / (242 * sum(diff_totalbill * diff_totalbill))
)
print("stderr value:  ", stderr)

# t-value = slope / stderr
t_value = b1 / stderr
print('t_value = ', t_value)

# Degrees of freedom = n - 2 = 244 - 2 = 242
deg_free = 242

# p-value from survival function (two-tailed)
p_value_d = t.sf(np.abs(t_value), deg_free)
print(f"p_value_d : {p_value_d:.10f}")
```

**الناتج المتوقع (لقطة الشاشة):**
> ```
> b1 value:   0.10502451738435355
> b0 value:   0.9202696135546682
> y =  0.10502451738435355 *x +  0.9202696135546682
> covariance total_bill and tips: 8.323501629224856
> correlation total_bill and tips: 0.6757341092113646
> stderr value:   0.00736647898848762598
> t_value =  14.26035495120059
> p_value_d : 0.0000000000
> ```

#### ملاحظة:
> قيمة `t_value` هنا 14.26 تختلف عن مثال الرواتب (24.59) لأن البيانات مختلفة. لكن كلاهما أكبر بكثير من القيمة الحرجة (~2.0 عند `df=242`)، إذن النموذج دال في الحالتين.

---

### 12. رسم الانحدار حسب الجنس — Regression by Sex

**النص الأصلي يقول:** `sns.lmplot` مع `hue='sex'` ثم مع `col='sex'`

**الشرح المبسّط:**
يمكن رسم خط انحدار منفصل لكل فئة (مثلاً كل جنس على حدة) باستخدام `hue` أو `col` في `lmplot`.

#### 💻 الكود: انحدار منفصل بالألوان (hue)

**ما هذا الكود؟**
> يرسم خطي انحدار (واحد لكل جنس) في نفس الرسم.

```python
from scipy import stats

# Create lmplot with separate regression lines by sex
g = sns.lmplot(data=df, x='total_bill', y='tip', hue='sex')

def annotate(data, **kws):
    slope, intercept, r, p, std_err = stats.linregress(
        data['total_bill'], data['tip']
    )
    ax = plt.gca()
    # Determine annotation position based on sex value
    sex = data['sex'].iloc[0]
    if sex == 1:
        x_pos, y_pos = 0.05, 0.7
    else:
        x_pos, y_pos = 0.05, 0.8
    ax.text(
        x_pos, y_pos,
        f'{sex}: y={slope:.1f}x+{intercept:.1f}, r={r:.2f}, p={p:.2g}, std_err={std_err:.3f}',
        transform=ax.transAxes
    )

g.map_dataframe(annotate)
plt.show()
```

**الناتج المتوقع (لقطة الشاشة):**
> ```
> 2: y=0.1x+1.0, r=0.68, p=3.2e-13, std_err=0.011
> 1: y=0.1x+0.9, r=0.67, p=8.8e-22, std_err=0.010
> ```

#### 💻 الكود: انحدار منفصل في لوحات مستقلة (col)

**ما هذا الكود؟**
> يرسم لوحتين منفصلتين (واحدة لكل جنس) جنباً إلى جنب.

```python
from scipy import stats

# Create faceted lmplot: one panel per sex value
g = sns.lmplot(data=df, x='total_bill', y='tip', col="sex")

def annotate(data, **kws):
    slope, intercept, r, p, std_err = stats.linregress(
        data['total_bill'], data['tip']
    )
    ax = plt.gca()
    ax.text(
        0.05, 0.8,
        f': y={slope:.3f}x+{intercept:.3f}, r={r:.3f}, p={p:.2g}, std_err={std_err:.3f}',
        transform=ax.transAxes
    )

g.map_dataframe(annotate)
plt.show()
```

**الناتج المتوقع (لقطة الشاشة):**
> لوحتان: `sex = 1` (ذكور): `y=0.108x+0.852, r=0.670` | `sex = 2` (إناث): `y=0.099x+1.048, r=0.683`

---

### 13. الانحدار المنفصل حسب الجنس — يدوياً

**النص الأصلي يقول:** كود منفصل للذكور (`dfmale`) وآخر للإناث (`dffemale`)

**الشرح المبسّط:**
أحياناً تريد حساب معاملات الانحدار لكل مجموعة بشكل كامل يدوياً (وليس فقط رسمها).

#### 💻 الكود: انحدار الذكور

**ما هذا الكود؟**
> يحسب `b1male`، `b0male`، `covariance`، `correlation`، و`stderr` للذكور فقط.

```python
# Filter male data (sex == 1)
dfmale = df[df['sex'] == 1]

mean_total_bill_male = dfmale['total_bill'].mean()
mean_tip_male = dfmale['tip'].mean()

diff_total_bill_male = dfmale['total_bill'] - mean_total_bill_male
diff_tip_male = dfmale['tip'] - mean_tip_male

# B1 for males
b1male = sum(diff_total_bill_male * diff_tip_male) / sum(
    diff_total_bill_male * diff_total_bill_male
)
# B0 for males
b0male = mean_tip_male - b1male * mean_total_bill_male
print(b1male, b0male)

# Covariance and correlation for males
cov_male = dfmale['total_bill'].cov(dfmale['tip'])
corr_male = dfmale['total_bill'].corr(dfmale['tip'])
print("covariance total_bill and tips:", cov_male)
print("correlation total_bill and tips:", corr_male)

# Standard error for males
prediction_male = dfmale['tip'] - (b1male * dfmale['total_bill'] + b0male)
stderr_male = math.sqrt(
    sum(prediction_male * prediction_male) /
    ((dfmale['sex'].count() - 2) * sum(diff_totalbill * diff_totalbill))
)
print("stderr male value:   ", stderr_male)
```

**الناتج المتوقع (لقطة الشاشة):**
> ```
> 0.10786606776096423  0.8521476939322583
> covariance total_bill and tips: 9.221784260166585
> correlation total_bill and tips: 0.6697529858911423
> stderr male value:   0.00920202423012964209
> ```

---

### 14. الانحدار الخطي المتعدد — Multiple Linear Regression

**النص الأصلي يقول:** بناء `df2` (المتغيرات المستقلة) وإضافة عمود `one`، ثم `df3`، `df3_transposed`، `df4`، `df5` للوصول للمعاملات

**الشرح المبسّط:**
`Multiple Linear Regression` يستخدم **أكثر من متغير مستقل** للتنبؤ:

$$
\hat{y} = b_0 + b_1 x_1 + b_2 x_2 + ... + b_k x_k
$$

#### 📐 المعادلة: OLS للانحدار المتعدد (صيغة المصفوفات)

$$
\mathbf{B} = (X^T X)^{-1} X^T y
$$

**الشرح:**
> - `X` = مصفوفة المتغيرات المستقلة (مع عمود الواحدات لـ `intercept`)
> - `X^T` = منقولة `X` (Transpose)
> - `(X^T X)^{-1}` = معكوس حاصل الضرب
> - `y` = متجه المتغير التابع
> - `B` = متجه المعاملات (`b0, b1, b2, ...`)

#### ⚙️ الخطوات / الخوارزمية: حساب معاملات الانحدار المتعدد

**ما هدف هذه العملية؟**
> الوصول لمعاملات المعادلة `B = (XᵀX)⁻¹ Xᵀy` خطوة بخطوة.

```algorithm
1 | اختيار المتغيرات المستقلة | pandas | df2 = df[['total_bill','sex','smoker','time','day','size']]
2 | إضافة عمود الواحدات | pandas | df2['one']=1 → df3 = df2[['one','total_bill','sex','smoker','time','day','size']]
3 | حساب Xᵀ | pandas | df3_transposed = df3.T
4 | حساب XᵀX | pandas | df4 = df3_transposed.dot(df3)
5 | حساب Xᵀy | pandas | df4_1 = df3_transposed.dot(df['tip'])
6 | حساب (XᵀX)⁻¹ | numpy | df4_2 = np.linalg.inv(df4)
7 | حساب B = (XᵀX)⁻¹ Xᵀy | numpy | df5 = df4_2.dot(df4_1)
```

#### نقاط التنفيذ:
- عمود `one` ضروري لحساب `intercept` (B₀) ضمن المعادلة المصفوفية
- ترتيب الأعمدة في `df3` يحدد ترتيب المعاملات في `df5`

#### 💻 الكود: بناء مصفوفات الانحدار المتعدد

**ما هذا الكود؟**
> يمر بخطوات المعادلة المصفوفية للانحدار المتعدد خطوة بخطوة.

```python
# Step 1: Select independent variables
df2 = df[['total_bill', 'sex', 'smoker', 'time', 'day', 'size']]
df2

# Step 2: Add intercept column (ones)
df2['one'] = 1
df3 = df2[['one', 'total_bill', 'sex', 'smoker', 'time', 'day', 'size']]
df3

# Step 3: Transpose X → Xᵀ
df3_transposed = df3.T
df3_transposed

# Step 4: Compute XᵀX
df4 = df3_transposed.dot(df3)
df4

# Step 5: Compute Xᵀy
df4_1 = df3_transposed.dot(df['tip'])
df4_1

# Step 6: Compute (XᵀX)⁻¹
df4_2 = np.linalg.inv(df4)
df4_2

# Step 7: Compute B = (XᵀX)⁻¹ Xᵀy
df5 = df4_2.dot(df4_1)
df5
```

#### شرح كل سطر:
1. `df2 = df[['total_bill', ...]]` → اختيار 6 متغيرات مستقلة
2. `df2['one'] = 1` → عمود الواحدات (intercept term)
3. `df3 = df2[['one', 'total_bill', ...]]` → إعادة ترتيب مع `one` أولاً
4. `df3_transposed = df3.T` → `Xᵀ` (7×244)
5. `df4 = df3_transposed.dot(df3)` → `XᵀX` (7×7)
6. `df4_1 = df3_transposed.dot(df['tip'])` → `Xᵀy` (7×1)
7. `df4_2 = np.linalg.inv(df4)` → `(XᵀX)⁻¹` (7×7)
8. `df5 = df4_2.dot(df4_1)` → `B` المعاملات (7 قيم)

**الناتج المتوقع (لقطة الشاشة):**
> ```
> array([ 0.71445138, 0.09432509, 0.03464496, -0.07566309, -0.11247777, 0.05273982, 0.17481962])
> ```
> أي: `0.094*total_bill + 0.034*sex - 0.075*smoker - 0.112*time + 0.0527*day + 0.17*size + 0.714`

#### مهم للامتحان ⚠️:
> المعادلة النهائية:
> **`tip = 0.094×total_bill + 0.034×sex − 0.075×smoker − 0.112×time + 0.0527×day + 0.17×size + 0.714`**
> 
> - كل معامل موجب = زيادة المتغير ترفع الإكرامية
> - `size` (0.17) له أكبر تأثير نسبي بعد `total_bill` (0.094)

---

## الجزء الثاني: ملخص منظم

### جدول: المصطلحات الأساسية

| المصطلح | التعريف | الرمز / الدالة |
| --- | --- | --- |
| `Simple Linear Regression` | نموذج خط مستقيم متغيرَين | `y = B1*x + B0` |
| `Multiple Linear Regression` | نموذج متعدد المتغيرات | `y = B0 + B1x1 + B2x2 + ...` |
| `Slope` | ميل الخط (تأثير `x` على `y`) | `B1` |
| `Intercept` | التقاطع مع محور `y` عند `x=0` | `B0` |
| `Residual` | الخطأ الفردي `y - ŷ` | `residuals` |
| `RSS` | مجموع مربعات الأخطاء | `np.sum(residuals**2)` |
| `MSE` | متوسط مربعات الأخطاء | `RSS / (n-2)` |
| `stderr_slope` | الخطأ المعياري للميل | `sqrt(MSE/var(x))` |
| `t-statistic` | نسبة الإشارة للضوضاء | `B1 / stderr` |
| `p-value` | احتمال الصدفة | `2 * t.sf(|t|, df)` |
| `Label Encoding` | تحويل النص لأرقام | `.map(dict)` |
| `OLS` | Ordinary Least Squares — طريقة المربعات الصغرى | صيغة `B = (XᵀX)⁻¹Xᵀy` |
| `Covariance` | التغاير بين متغيرين | `.cov()` |
| `Correlation` | الارتباط (−1 إلى 1) | `.corr()` |

### جدول: أخطاء شائعة

| الخطأ | السبب | التصحيح |
| --- | --- | --- |
| القسمة على `n` بدلاً من `n-2` في `MSE` | نسيان درجات الحرية | دائماً `MSE = RSS / (n-2)` للانحدار البسيط |
| نسيان عمود `one` في المتعدد | غياب الـ `intercept` | أضف `df['one'] = 1` قبل بناء `df3` |
| استخدام `t.cdf` مباشرة بلا ضرب في 2 | اختبار أحادي بدلاً من ثنائي | `p = 2 * t.sf(|t|, df)` |
| عدم تحويل الأعمدة النصية | `ML` لا يقبل النصوص | طبّق `.map()` على كل عمود فئوي |
| `x` و`y` معكوسان في `linregress` | المتغير التابع في مكان المستقل | `linregress(x_independent, y_dependent)` |

### جدول: مقارنة الانحدار البسيط مقابل المتعدد

| المعيار | `Simple Linear Regression` | `Multiple Linear Regression` |
| --- | --- | --- |
| عدد المتغيرات | متغير واحد `x` | متعدد `x1, x2, ...` |
| الصيغة | `y = B1x + B0` | `y = B0 + B1x1 + B2x2 + ...` |
| حساب المعاملات | معادلة مباشرة | صيغة مصفوفية `(XᵀX)⁻¹Xᵀy` |
| الأدوات | `numpy` يدوياً | `numpy.linalg.inv` + `.dot()` |
| التفسير | سهل (ميل وتقاطع) | أصعب (معامل كل متغير) |

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: بناء Simple Linear Regression من الصفر

**ما هدف هذه العملية؟**
> التنبؤ بقيمة `y` من قيمة `x` باستخدام خط مستقيم محسوب بطريقة `OLS`.

```algorithm
1 | تعريف البيانات | numpy | x = np.array([...]) و y = np.array([...])
2 | حساب المتوسطات | numpy | x_mean = np.mean(x) و y_mean = np.mean(y)
3 | حساب الميل B1 | numpy | slope = np.sum((x-x_mean)*(y-y_mean)) / np.sum((x-x_mean)**2)
4 | حساب نقطة التقاطع B0 | numpy | intercept = y_mean - slope * x_mean
5 | حساب القيم المتوقعة | numpy | y_pred = slope * x + intercept
6 | حساب الأخطاء | numpy | residuals = y - y_pred
7 | حساب RSS | numpy | rss = np.sum(residuals**2)
8 | حساب MSE | numpy | mse = rss / (n - 2)
9 | حساب stderr الميل | numpy | stderr = sqrt(mse / sum((x-x_mean)**2))
10 | حساب t-statistic | python | t_stat = slope / stderr
11 | حساب p-value | scipy | p = 2 * t.sf(abs(t_stat), n-2)
```

#### ⚙️ الخطوات / الخوارزمية: تحويل الأعمدة النصية

**ما هدف هذه العملية؟**
> جعل البيانات قابلة للمعالجة الرياضية بتحويل الفئات النصية لأرقام.

```algorithm
1 | تعريف قاموس التحويل | python | mapping = {'Male': 1, 'Female': 2}
2 | تطبيقه على العمود | pandas | df['sex'] = df['sex'].map(mapping)
3 | تكرار لكل عمود نصي | pandas | نفس الخطوتين لـ smoker و day و time
4 | التحقق | pandas | df.describe() للتأكد من التحويل
```

#### ⚙️ الخطوات / الخوارزمية: Multiple Linear Regression (صيغة المصفوفات)

**ما هدف هذه العملية؟**
> إيجاد معاملات انحدار متعدد بدون `scikit-learn`.

```algorithm
1 | اختيار المتغيرات | pandas | df2 = df[['total_bill','sex',...]]
2 | إضافة عمود الواحدات | pandas | df2['one'] = 1
3 | ترتيب الأعمدة | pandas | df3 = df2[['one','total_bill',...]]
4 | حساب Xᵀ | pandas | df3_transposed = df3.T
5 | حساب XᵀX | pandas | df4 = df3_transposed.dot(df3)
6 | حساب Xᵀy | pandas | df4_1 = df3_transposed.dot(df['tip'])
7 | حساب (XᵀX)⁻¹ | numpy | df4_2 = np.linalg.inv(df4)
8 | حساب B | numpy | df5 = df4_2.dot(df4_1)
```

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1 (متوسط): ما الفرق بين B0 و B1 في معادلة الانحدار؟
أ) `B0` هو الميل، `B1` هو نقطة التقاطع
ب) `B0` هو نقطة التقاطع، `B1` هو الميل ✅
ج) كلاهما ميول لمتغيرات مختلفة
د) `B0` هو الخطأ المعياري، `B1` هو معامل الارتباط

**التعليل:**
- **أ** خاطئ: العكس صحيح
- **ب** صحيح: `B0 = intercept` (قيمة `y` عند `x=0`)، `B1 = slope` (التغير في `y` لكل وحدة `x`)
- **ج** خاطئ: `B0` ليس ميلاً
- **د** خاطئ: ليس له علاقة بمقاييس الجودة

---

### السؤال 2 (متوسط): لماذا نقسم على (n-2) في MSE وليس (n)؟
أ) لأن الصيغة خاطئة في الكود
ب) لأننا نستهلك درجتَي حرية في تقدير `B0` و`B1` ✅
ج) لأن `n-2` دائماً أكبر من `n`
د) لأن أول وآخر قيمة دائماً صفر

**التعليل:**
- **ب** صحيح: درجات الحرية `df = n - p` حيث `p = 2` (عدد المعاملات)، فالمقسوم عليه `n-2`
- **أ، ج، د** خاطئة رياضياً وإحصائياً

---

### السؤال 3 (صعب): ما الاستنتاج إذا كانت t_stat = 24.6 و p-value = 0.000016 عند α = 0.05؟
أ) نقبل H₀ (لا علاقة بين المتغيرين)
ب) نرفض H₀ — توجد علاقة دالة إحصائياً ✅
ج) p-value > α إذن العلاقة عشوائية
د) يجب حساب معامل الارتباط أولاً

**التعليل:**
- **ب** صحيح: `p = 0.000016 < α = 0.05` → نرفض `H₀`، والعلاقة إحصائية دالة
- **أ** عكس الصحيح
- **ج** خاطئ: `p = 0.000016 < 0.05` وليس أكبر
- **د** غير ضروري — اختبار `t` كافٍ للقرار

---

### السؤال 4 (متوسط): ما وظيفة عمود `one` في الانحدار المتعدد؟
أ) ترقيم الصفوف
ب) يمثل حد التقاطع `B0` في صيغة المصفوفات ✅
ج) ضغط البيانات وتقليل حجمها
د) حساب المتوسط التلقائي

**التعليل:**
- **ب** صحيح: في صيغة `B = (XᵀX)⁻¹Xᵀy`، كل صف في `X` يبدأ بـ`1` حتى يظهر `B0` في المعادلة

---

### السؤال 5 (صعب): ما ناتج الكود التالي؟
```python
x = np.array([1, 2, 3])
y = np.array([2, 4, 6])
x_mean, y_mean = np.mean(x), np.mean(y)
slope = np.sum((x - x_mean) * (y - y_mean)) / np.sum((x - x_mean)**2)
intercept = y_mean - slope * x_mean
print(slope, intercept)
```
أ) 1.0 و 1.0
ب) 2.0 و 0.0 ✅
ج) 0.5 و 2.0
د) 3.0 و -1.0

**التعليل:**
- `x̄ = 2, ȳ = 4`
- بسط = `(1-2)(2-4) + (2-2)(4-4) + (3-2)(6-4) = 2 + 0 + 2 = 4`
- مقام = `(1-2)² + 0 + (3-2)² = 1 + 1 = 2`
- `slope = 4/2 = 2.0`، `intercept = 4 - 2×2 = 0.0`

---

### السؤال 6 (متوسط): ما وظيفة `.map()` في الانحدار؟
أ) رسم خريطة جغرافية
ب) تطبيق قاموس لتحويل قيم نصية إلى أرقام ✅
ج) حساب الارتباط
د) تقسيم البيانات

**التعليل:**
- **ب** صحيح: `df['sex'].map({'Male':1, 'Female':2})` يستبدل كل قيمة نصية بالرقم المقابل في القاموس

---

### السؤال 7 (صعب): في الكود `g = sns.lmplot(data=df, x='total_bill', y='tip', col='sex')`، ماذا يعني `col='sex'`؟
أ) لون الخط يعتمد على `sex`
ب) رسم لوحة منفصلة (facet) لكل قيمة في `sex` ✅
ج) تصفية البيانات بحيث نعرض جنساً واحداً فقط
د) ترتيب النقاط حسب `sex`

**التعليل:**
- **ب** صحيح: `col` في `seaborn` يُنشئ `facet grid` — لوحة مستقلة لكل فئة
- **أ** خاطئ: ذلك هو `hue`، وليس `col`

---

### السؤال 8 (متوسط): ما معنى r = 0.676 في نتيجة الانحدار؟
أ) `68%` من الفاتورة يذهب إكرامية
ب) هناك ارتباط موجب متوسط إلى قوي بين الفاتورة والإكرامية ✅
ج) `B1 = 0.676`
د) الخطأ في التنبؤ 67%

**التعليل:**
- **ب** صحيح: `r` هو معامل الارتباط `Pearson`، قيمته بين −1 و+1. `0.676` يعني ارتباطاً موجباً متوسطاً إلى قوياً

---

### السؤال 9 (صعب): ما عدد درجات الحرية في مثال Tips مع 244 مشاهدة؟
أ) 244
ب) 243
ج) 242 ✅
د) 241

**التعليل:**
- **ج** صحيح: `df = n - 2 = 244 - 2 = 242` للانحدار البسيط (معاملان: `B0` و`B1`)

---

### السؤال 10 (صعب): في صيغة المصفوفات B = (XᵀX)⁻¹Xᵀy، ما شكل مصفوفة Xᵀ إذا كان n=244 و k=7 (متغيرات + intercept)؟
أ) 244 × 7
ب) 7 × 244 ✅
ج) 7 × 7
د) 244 × 244

**التعليل:**
- `X` : 244×7 → منقولتها `Xᵀ` : 7×244
- `XᵀX` : 7×7
- `Xᵀy` : 7×1
- `B = (XᵀX)⁻¹Xᵀy` : 7×1

---

### السؤال 11 (متوسط): ما الفرق بين `hue='sex'` و`col='sex'` في seaborn؟
أ) لا فرق، كلاهما نفس الوظيفة
ب) `hue` يميّز بالألوان في نفس الرسم؛ `col` يُنشئ لوحات منفصلة ✅
ج) `hue` أسرع من `col`
د) `col` يعمل فقط مع `relplot`

**التعليل:**
- **ب** صحيح: `hue` = ألوان مختلفة في نفس المحور؛ `col` = `facet grid` (محاور منفصلة)

---

### السؤال 12 (متوسط): ما وظيفة `np.linalg.inv()`؟
أ) حساب محدد المصفوفة (Determinant)
ب) إيجاد المصفوفة المعكوسة ✅
ج) حساب القيم الذاتية (Eigenvalues)
د) جمع مصفوفتين

**التعليل:**
- **ب** صحيح: `np.linalg.inv(A)` تُرجع `A⁻¹` بحيث `A × A⁻¹ = I` (مصفوفة الهوية)

---

### السؤال 13 (صعب): ما المشكلة إذا كانت مصفوفة XᵀX غير قابلة للعكس؟
أ) لا مشكلة، `numpy` تتجاهلها
ب) يعني وجود `multicollinearity` (ارتباط تام بين متغيرَين مستقلَّين) ✅
ج) يعني أن `n < k`
د) يعني خطأ في قراءة البيانات

**التعليل:**
- **ب** صحيح: إذا كانت متغيرات `X` مترابطة تماماً، يصبح محدد `XᵀX = 0` فلا يمكن عكسها. وهذا ما يُسمى `multicollinearity` (غير مشروحة بالتفصيل في المحاضرة).

---

### السؤال 14 (صعب): ما ترتيب الخطوات الصحيح لحساب p-value من t-statistic؟
أ) t_stat → CDF → p-value مباشرة
ب) t_stat → |t_stat| → sf(|t|, df) → ضرب في 2 ✅
ج) t_stat → مربع t → CDF
د) p-value = 1 - t_stat

**التعليل:**
- **ب** صحيح: للاختبار ثنائي الطرف: `p = 2 × t.sf(|t|, df)`
- الخطوات: أخذ القيمة المطلقة ← `sf` (الذيل الأيمن) ← ضرب في 2

---

### السؤال 15 (صعب): إذا كان B1 للذكور = 0.1079 وللإناث = 0.0989، ما الاستنتاج؟
أ) كلا النموذجَين متطابقان
ب) الذكور يميلون لزيادة الإكرامية بنسبة أعلى مع ارتفاع الفاتورة مقارنة بالإناث ✅
ج) النموذج خاطئ — B1 يجب أن يكون واحداً
د) الإناث لا علاقة لهن بالفاتورة

**التعليل:**
- **ب** صحيح: `B1` يعني تغير الإكرامية لكل وحدة فاتورة. الذكور (0.1079) > الإناث (0.0989) أي ميل الذكور أشد قليلاً.

---

### السؤال 16 (متوسط): ما الناتج الصحيح لـ `df3_transposed.dot(df3)` إذا كان `df3` شكله 244×7؟
أ) 244 × 244
ب) 7 × 7 ✅
ج) 244 × 7
د) 7 × 244

**التعليل:**
- `df3` : 244×7 → `df3.T` : 7×244
- `(7×244) × (244×7) = 7×7`
- هذه مصفوفة `XᵀX` المربعة (7×7)

---

## الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح 1 (logic): خطأ في حساب B0

**الكود الخاطئ:**
```python
x_mean = np.mean(x)
y_mean = np.mean(y)
slope = np.sum((x - x_mean) * (y - y_mean)) / np.sum((x - x_mean) ** 2)
intercept = x_mean - slope * y_mean  # BUG HERE
```

**اكتشف الخطأ:** في السطر الأخير، المتغيران `x_mean` و`y_mean` معكوسان. المعادلة الصحيحة هي `B0 = ȳ - B1 × x̄`.

**التصحيح:**
```python
x_mean = np.mean(x)
y_mean = np.mean(y)
slope = np.sum((x - x_mean) * (y - y_mean)) / np.sum((x - x_mean) ** 2)
intercept = y_mean - slope * x_mean  # FIXED: y_mean first, then x_mean
```

**شرح الحل:**
1. `B0 = ȳ - B1 × x̄` — المعادلة الرياضية الصحيحة
2. `y_mean` هو المتوسط الذي نطرح منه
3. `slope * x_mean` هو `B1 × x̄`

---

### سؤال تصحيح 2 (wrong_formula): خطأ في درجات الحرية

**الكود الخاطئ:**
```python
rss = np.sum(residuals ** 2)
mse = rss / n  # BUG: wrong denominator
stderr_slope = np.sqrt(mse / x_variance)
```

**اكتشف الخطأ:** القسمة على `n` بدلاً من `n-2` يُنتج `MSE` مُحيَّز (`biased`) — أصغر من الصحيح، مما يُبالغ في دقة النموذج.

**التصحيح:**
```python
rss = np.sum(residuals ** 2)
mse = rss / (n - 2)  # FIXED: divide by degrees of freedom
stderr_slope = np.sqrt(mse / x_variance)
```

**شرح الحل:**
1. الانحدار البسيط يُقدِّر معاملَين (`B0`، `B1`) → يستهلك درجتَي حرية
2. `df = n - 2` هي درجات الحرية الصحيحة
3. `MSE` المحيَّز يُعطي `t-statistic` خاطئاً

---

### سؤال تصحيح 3 (misconception): p-value أحادي الطرف بدلاً من ثنائي

**الكود الخاطئ:**
```python
from scipy.stats import t
t_stat = slope / stderr_slope
dfree = n - 2
p_value = t.sf(np.abs(t_stat), dfree)  # BUG: one-tailed
```

**اكتشف الخطأ:** لم يُضرب في 2. اختبار H₁: `B1 ≠ 0` هو اختبار ثنائي الطرف (`two-tailed`)، يجب ضرب الذيل في 2.

**التصحيح:**
```python
from scipy.stats import t
t_stat = slope / stderr_slope
dfree = n - 2
p_value = 2 * t.sf(np.abs(t_stat), dfree)  # FIXED: two-tailed
```

**شرح الحل:**
1. `H₁: B1 ≠ 0` يعني الرفض يحدث في كلا الذيلَين
2. مساحة الذيل الأيمن فقط = `sf`, المجموع = `2 × sf`
3. اختبار أحادي يُعطي `p-value` أصغر من الصحيح → استنتاجات زائفة

---

### سؤال تصحيح 4 (logic): خطأ في تصفية البيانات

**الكود الخاطئ:**
```python
# Trying to get male data
dfmale = df[df['sex'] == 'Male']  # BUG: sex already encoded as int
mean_total_bill_male = dfmale['total_bill'].mean()
```

**اكتشف الخطأ:** بعد تطبيق `.map({'Male':1, 'Female':2})`، العمود `sex` يحتوي أرقاماً (1, 2) وليس نصوصاً. التصفية بالنص `'Male'` ستُرجع `DataFrame` فارغاً.

**التصحيح:**
```python
# Filter using the encoded integer value
dfmale = df[df['sex'] == 1]  # FIXED: use numeric value after encoding
mean_total_bill_male = dfmale['total_bill'].mean()
```

**شرح الحل:**
1. بعد `df['sex'] = df['sex'].map({'Male':1, 'Female':2})`، القيم أصبحت `1` و`2`
2. `df[df['sex'] == 'Male']` → لا تجد تطابقاً → نتيجة فارغة
3. `df[df['sex'] == 1]` → يُعطي الصفوف الصحيحة

---

### سؤال تصحيح 5 (return_check): خطأ في ترتيب أعمدة df3

**الكود الخاطئ:**
```python
df2 = df[['total_bill', 'sex', 'smoker', 'time', 'day', 'size']]
df2['one'] = 1
df3 = df2  # BUG: 'one' is last column, should be first
df4 = df3.T.dot(df3)
df4_1 = df3.T.dot(df['tip'])
df4_2 = np.linalg.inv(df4)
df5 = df4_2.dot(df4_1)
```

**اكتشف الخطأ:** عمود `one` (الـ intercept) يجب أن يكون **أول** عمود في `df3` لتكون النتيجة `B = [B0, B1, B2, ...]` بالترتيب الصحيح.

**التصحيح:**
```python
df2 = df[['total_bill', 'sex', 'smoker', 'time', 'day', 'size']]
df2['one'] = 1
# FIXED: reorder with 'one' first
df3 = df2[['one', 'total_bill', 'sex', 'smoker', 'time', 'day', 'size']]
df4 = df3.T.dot(df3)
df4_1 = df3.T.dot(df['tip'])
df4_2 = np.linalg.inv(df4)
df5 = df4_2.dot(df4_1)
```

**شرح الحل:**
1. الترتيب في `X` يحدد ترتيب `B` في الناتج
2. `B[0]` سيكون معامل أول عمود — يجب أن يكون `intercept`
3. وضع `one` في النهاية يُربك تفسير المعاملات

---

## الجزء الرابع: تمارين إضافية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل**

### تمرين 1 (fill_gaps): أكمل كود حساب B1

**المعطيات:**
```python
import numpy as np
x = np.array([2, 4, 6, 8])
y = np.array([10, 20, 30, 40])
x_mean = _______(x)   # (1)
y_mean = np.mean(y)
numerator = np.sum(_______ * (y - y_mean))  # (2)
denominator = np.sum((x - x_mean) ** _____) # (3)
slope = _______ / _______                   # (4)
```

**نموذج الحل:**
```python
x_mean = np.mean(x)                # (1): np.mean
numerator = np.sum((x - x_mean) * (y - y_mean))  # (2): (x - x_mean)
denominator = np.sum((x - x_mean) ** 2)           # (3): 2
slope = numerator / denominator                    # (4): numerator / denominator
# Expected slope = 5.0
```

---

### تمرين 2 (numerical_solve): حساب يدوي

**المعطيات:** بيانات طلاب: ساعات الدراسة `x = [1, 2, 3, 4, 5]` والدرجة `y = [50, 55, 65, 70, 80]`

**المطلوب:**
1. احسب `x̄` و`ȳ`
2. احسب `B1` (الميل)
3. احسب `B0` (التقاطع)
4. تنبّأ بدرجة طالب درس 6 ساعات

**نموذج الحل:**
```python
# x̄ = (1+2+3+4+5)/5 = 3
# ȳ = (50+55+65+70+80)/5 = 64

# numerator = (1-3)(50-64) + (2-3)(55-64) + (3-3)(65-64) + (4-3)(70-64) + (5-3)(80-64)
#           = (-2)(-14) + (-1)(-9) + (0)(1) + (1)(6) + (2)(16)
#           = 28 + 9 + 0 + 6 + 32 = 75

# denominator = (1-3)² + (2-3)² + (3-3)² + (4-3)² + (5-3)²
#             = 4 + 1 + 0 + 1 + 4 = 10

# B1 = 75 / 10 = 7.5
# B0 = 64 - 7.5 × 3 = 64 - 22.5 = 41.5

# For x=6: ŷ = 7.5 × 6 + 41.5 = 45 + 41.5 = 86.5
```

---

### تمرين 3 (code_fix): صحّح كود التحويل

**الكود الخاطئ:**
```python
mapping = {'Thur': 1, 'Fri': 2, 'Sat': 3, 'Sun': 4}
df['day'] = df['day'].apply(mapping)  # ERROR
```

**نموذج الحل:**
```python
mapping = {'Thur': 1, 'Fri': 2, 'Sat': 3, 'Sun': 4}
df['day'] = df['day'].map(mapping)  # FIXED: use .map() not .apply()
# .apply() requires a function, .map() accepts a dictionary
```

---

### تمرين 4 (fill_gaps): أكمل كود الانحدار المتعدد

```python
df2 = df[['total_bill', 'sex', 'smoker', 'time', 'day', 'size']]
df2['one'] = _____                   # (1)
df3 = df2[['one', 'total_bill', 'sex', 'smoker', 'time', 'day', 'size']]
df3_transposed = df3._____           # (2)
df4 = df3_transposed._____(df3)      # (3)
df4_1 = df3_transposed._____(df['tip'])  # (4)
df4_2 = np.linalg._____(df4)        # (5)
df5 = df4_2._____(df4_1)            # (6)
```

**نموذج الحل:**
```python
df2['one'] = 1                       # (1): constant column
df3_transposed = df3.T               # (2): transpose
df4 = df3_transposed.dot(df3)        # (3): XᵀX
df4_1 = df3_transposed.dot(df['tip']) # (4): Xᵀy
df4_2 = np.linalg.inv(df4)          # (5): (XᵀX)⁻¹
df5 = df4_2.dot(df4_1)              # (6): B = (XᵀX)⁻¹Xᵀy
```

---

### تمرين 5 (scenario): سيناريو تفسير معاملات

**المعطيات:** نموذج الانحدار المتعدد أعطى:
`tip = 0.094×total_bill + 0.034×sex − 0.075×smoker − 0.112×time + 0.0527×day + 0.17×size + 0.714`

**المطلوب:**
1. من أكثر المتغيرات تأثيراً على الإكرامية؟
2. هل التدخين يرفع الإكرامية أم يخفضها؟
3. تنبّأ بإكرامية فاتورة 30$، ذكر (1)، مدخن (1)، عشاء (2)، يوم الجمعة (2)، حجم 3 أشخاص

**نموذج الحل:**
```
1. total_bill هو الأكثر تأثيراً (معامل 0.094 × أكبر نطاق من القيم)
2. التدخين (smoker) معامله -0.075 → يُقلل الإكرامية
3. tip = 0.094×30 + 0.034×1 − 0.075×1 − 0.112×2 + 0.0527×2 + 0.17×3 + 0.714
       = 2.82 + 0.034 − 0.075 − 0.224 + 0.1054 + 0.51 + 0.714
       = 3.884$
```

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين تحليل 1 (written_analysis): تحليل نتائج الانحدار

**السيناريو:** نموذج انحدار أعطى `r = 0.3` و`p = 0.15` عند `n = 20`.

**المطلوب:** هل تقبل النموذج؟ علّل.

**نموذج الإجابة:**
- `p = 0.15 > 0.05` → لا نرفض `H₀` → العلاقة **ليست دالة إحصائياً**
- `r = 0.3` ضعيف
- **الاستنتاج:** النموذج غير مناسب. يجب زيادة حجم العينة أو البحث عن متغيرات أقوى ارتباطاً.

---

### تمرين تحليل 2 (table_fill): مقارنة نماذج

**المعطيات:** نموذجان لنفس البيانات:

| المقياس | النموذج A | النموذج B |
| --- | --- | --- |
| r | 0.85 | 0.62 |
| p-value | 0.001 | 0.03 |
| MSE | 1200 | 800 |
| عدد المتغيرات | 1 | 4 |

**المطلوب:** أيهما أفضل؟ علّل.

**نموذج الإجابة:**
النموذج B أفضل رغم `r` أقل لأن:
- `MSE` أصغر (800 مقابل 1200) → أخطاء تنبؤ أقل
- كلاهما دال إحصائياً (`p < 0.05`)
- يستخدم 4 متغيرات → أكثر شمولاً

---

### تمرين تحليل 3 (diagram_completion): مراحل بناء النموذج

**المطلوب:** رتّب الخطوات التالية بالترتيب الصحيح:

`[حساب p-value] → [تحويل البيانات النصية] → [حساب B1 و B0] → [تحميل البيانات] → [رسم خط الانحدار] → [حساب RSS و MSE]`

**نموذج الإجابة:**
1. تحميل البيانات
2. تحويل البيانات النصية
3. حساب `B1` و`B0`
4. حساب `RSS` و`MSE`
5. حساب `p-value`
6. رسم خط الانحدار

---

### تمرين تحليل 4 (case_study): دراسة حالة

**السيناريو:** شركة تريد التنبؤ بمبيعاتها بناءً على ميزانية الإعلانات، حرارة الطقس، وموسم السنة.

**المطلوب:** كيف تبني نموذج انحدار مناسب؟

**نموذج الإجابة:**
1. استخدم `Multiple Linear Regression` (3 متغيرات مستقلة)
2. حوّل `موسم السنة` (فئوي) بـ`.map()` أو `One-Hot Encoding`
3. أضف عمود `one` لـ intercept
4. احسب `B = (XᵀX)⁻¹Xᵀy`
5. تحقق من `p-value` لكل معامل (< 0.05 = دال)
6. استخدم `MSE` لمقارنة النماذج

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: تتبع حساب B1

**المدخل:**
```python
x = np.array([1, 2, 3])
y = np.array([3, 5, 7])
x_mean = 2.0, y_mean = 5.0
```

**أكمل الجدول:**

| الخطوة | العملية | القيمة |
| --- | --- | --- |
| 1 | `(x[0] - x_mean) * (y[0] - y_mean)` | ؟ |
| 2 | `(x[1] - x_mean) * (y[1] - y_mean)` | ؟ |
| 3 | `(x[2] - x_mean) * (y[2] - y_mean)` | ؟ |
| 4 | `numerator = sum(أعلاه)` | ؟ |
| 5 | `denominator = sum((x-x_mean)**2)` | ؟ |
| 6 | `slope = numerator / denominator` | ؟ |

**نموذج الحل:**

| الخطوة | العملية | القيمة |
| --- | --- | --- |
| 1 | `(1-2) * (3-5)` | `(-1)(-2) = 2` |
| 2 | `(2-2) * (5-5)` | `(0)(0) = 0` |
| 3 | `(3-2) * (7-5)` | `(1)(2) = 2` |
| 4 | `numerator = 2+0+2` | `4` |
| 5 | `(-1)²+(0)²+(1)² = 1+0+1` | `2` |
| 6 | `slope = 4 / 2` | **`2.0`** |

**النتيجة:** `slope = 2.0`, `intercept = 5.0 - 2.0×2 = 1.0`

---

### تمرين تتبع 2: تتبع خطوات Multiple Regression

**المدخل:** `df3` شكله `(3×3)`:
```
one  x1  x2
1    2   3
1    4   6
1    6   9
```
`y = [10, 20, 30]`

**أكمل الجدول:**

| الخطوة | العملية | الشكل الناتج |
| --- | --- | --- |
| 1 | `df3.T` | ؟ |
| 2 | `df3.T.dot(df3)` | ؟ |
| 3 | `df3.T.dot(y)` | ؟ |
| 4 | `np.linalg.inv(...)` | ؟ |
| 5 | `inv.dot(Xᵀy)` | ؟ |

**نموذج الحل:**

| الخطوة | العملية | الشكل الناتج |
| --- | --- | --- |
| 1 | `df3.T` | `3×3` |
| 2 | `df3.T.dot(df3)` | `3×3` (مصفوفة `XᵀX`) |
| 3 | `df3.T.dot(y)` | متجه `3×1` (`Xᵀy`) |
| 4 | `np.linalg.inv(...)` | `3×3` (`(XᵀX)⁻¹`) |
| 5 | `inv.dot(Xᵀy)` | متجه `3×1` (`B = [B0, B1, B2]`) |

---

### تمرين تتبع 3: تتبع حساب p-value

**المدخل:** `slope = 314.29`, `stderr = 12.7775`, `n = 6`

**أكمل الجدول:**

| الخطوة | العملية | القيمة |
| --- | --- | --- |
| 1 | `t_stat = slope / stderr` | ؟ |
| 2 | `dfree = n - 2` | ؟ |
| 3 | `cdf_at_t = t.cdf(t_stat, dfree)` | ؟ (تقريباً) |
| 4 | `right_tail = 1 - cdf_at_t` | ؟ |
| 5 | `p_value = 2 * right_tail` | ؟ |
| 6 | الاستنتاج (α=0.05) | ؟ |

**نموذج الحل:**

| الخطوة | العملية | القيمة |
| --- | --- | --- |
| 1 | `314.29 / 12.7775` | `24.5967` |
| 2 | `6 - 2` | `4` |
| 3 | `t.cdf(24.5967, 4)` | `≈ 0.999992` |
| 4 | `1 - 0.999992` | `≈ 0.000008` |
| 5 | `2 × 0.000008` | `≈ 0.000016` |
| 6 | `0.000016 < 0.05` | **نرفض H₀ — علاقة دالة** |

---

## الجزء الرابع: أسئلة تصميم

### سؤال تصميم 1: تصميم خط معالجة بيانات

**المطلوب:**
صمم خط معالجة (`pipeline`) كامل لبناء نموذج انحدار متعدد على مجموعة بيانات جديدة تحتوي أعمدة نصية وأرقامية.

**نموذج الإجابة:**

```diagram
type: flowchart
title: Pipeline for Multiple Regression
direction: TD
nodes:
  - id: load
    label: تحميل البيانات (pd.read_csv)
    kind: process
    level: 0
  - id: explore
    label: استكشاف (df.info, df.describe)
    kind: process
    level: 1
  - id: encode
    label: تشفير الأعمدة النصية (.map)
    kind: process
    level: 2
  - id: select
    label: اختيار المتغيرات المستقلة df2
    kind: process
    level: 3
  - id: addone
    label: إضافة عمود الواحدات (one=1)
    kind: process
    level: 4
  - id: matrix
    label: حساب XᵀX و Xᵀy
    kind: process
    level: 5
  - id: solve
    label: B = (XᵀX)⁻¹ Xᵀy
    kind: process
    level: 6
  - id: evaluate
    label: تقييم (r, p-value, MSE)
    kind: decision
    level: 7
  - id: end
    label: نموذج جاهز للتنبؤ
    kind: event
    level: 8
edges:
  - from: load
    to: explore
    label: ""
  - from: explore
    to: encode
    label: ""
  - from: encode
    to: select
    label: ""
  - from: select
    to: addone
    label: ""
  - from: addone
    to: matrix
    label: ""
  - from: matrix
    to: solve
    label: ""
  - from: solve
    to: evaluate
    label: ""
  - from: evaluate
    to: end
    label: "p < 0.05"
  - from: evaluate
    to: encode
    label: "p ≥ 0.05 → أعد"
```

**معايير التقييم:**
- تضمّن خطوة تحويل البيانات النصية
- تضمّن إضافة عمود `one` قبل المصفوفات
- تضمّن التقييم بـ`p-value` و`MSE`
- وضّح نقطة القرار (إعادة المحاولة عند فشل الاختبار)

---

### سؤال تصميم 2: تصميم دالة انحدار عامة

**المطلوب:** صمم واجهة (interface) لدالة Python تُجري انحداراً بسيطاً وتُرجع جميع المقاييس المطلوبة.

**نموذج الإجابة:**

```python
def simple_regression(x, y):
    """
    Performs Simple Linear Regression.
    
    Parameters:
    -----------
    x: array-like, independent variable
    y: array-like, dependent variable
    
    Returns:
    --------
    dict with keys: slope, intercept, rss, mse, stderr, t_stat, p_value, r
    """
    # Implementation here
    pass

# Expected usage:
# result = simple_regression(x=[1,2,3,4,5,6], y=[3500,3800,4200,4500,4700,5100])
# print(result['slope'])   # 314.29
# print(result['p_value']) # 0.000016
```

**معايير التقييم:**
- تعريف واضح للمدخلات والمخرجات
- إرجاع جميع المقاييس في قاموس
- قابلية إعادة الاستخدام (لا بيانات مُضمَّنة)
- وجود docstring واضح

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما معادلة خط الانحدار البسيط؟
A: `ŷ = B1 × x + B0` حيث `B1` الميل و`B0` نقطة التقاطع

**Q2:** كيف تحسب `B1` (الميل) في الانحدار البسيط؟
A: `B1 = Σ(xi - x̄)(yi - ȳ) / Σ(xi - x̄)²`

**Q3:** كيف تحسب `B0` (التقاطع) بعد إيجاد `B1`؟
A: `B0 = ȳ - B1 × x̄`

**Q4:** لماذا يقسم `MSE` على `n-2` وليس `n`؟
A: لأن الانحدار البسيط يقدّر معاملَين (`B0` و`B1`) يستهلكان درجتَي حرية

**Q5:** ما وظيفة `t.sf()` في scipy؟
A: تحسب `1 - CDF` (المساحة في الذيل الأيمن). `sf(|t|, df)` = احتمال الحصول على قيمة أكبر من `|t|`

**Q6:** لماذا نضرب `p-value` في 2؟
A: لأن اختبارنا ثنائي الطرف (`H₁: B1 ≠ 0`) — الرفض يحدث في كلا الطرفين

**Q7:** ما وظيفة `.map()` في pandas؟
A: تُطبّق قاموساً على عمود، مستبدلةً كل قيمة بمقابلها في القاموس (مثل تحويل نصوص لأرقام)

**Q8:** لماذا نُضيف عمود `one` في الانحدار المتعدد؟
A: لتمثيل حد التقاطع `B0` في صيغة المصفوفات. بدونه سيمر الخط من الأصل.

**Q9:** ما معنى معامل ارتباط `r = 0.676`؟
A: ارتباط موجب متوسط إلى قوي — `68%` تقريباً من تغير `y` مرتبط بـ`x`

**Q10:** ما الفرق بين `hue` و`col` في seaborn؟
A: `hue` يميّز الفئات بالألوان في نفس الرسم؛ `col` ينشئ لوحات مستقلة لكل فئة

**Q11:** ما ناتج `df3.T.dot(df3)` إذا كان شكل `df3` هو `(244×7)`؟
A: مصفوفة `7×7` — هذه `XᵀX`

**Q12:** ما وظيفة `np.linalg.inv()`؟
A: تحسب المصفوفة المعكوسة `A⁻¹` بحيث `A × A⁻¹ = I`

**Q13:** ماذا يعني `p-value < 0.05`؟
A: نرفض `H₀` — العلاقة بين المتغيرين دالة إحصائياً وليست صدفة

**Q14:** ما وظيفة `sns.lmplot`؟
A: يرسم مخطط انتشار مع خط الانحدار تلقائياً ونطاق الثقة المظلل

**Q15:** ما الفرق بين `Covariance` و`Correlation`؟
A: `Covariance` يقيس اتجاه العلاقة بوحدات البيانات (غير محدودة). `Correlation` مُعيَّرة بين −1 و+1

**Q16:** كيف تتنبأ بـ`tip` لفاتورة 25$ من النموذج `y = 0.105x + 0.920`؟
A: `tip = 0.105 × 25 + 0.920 = 2.625 + 0.920 = 3.545$`

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### سؤال 1: ما هو `Simple Linear Regression`؟

**نموذج الإجابة:**
1. **التعريف:** نموذج إحصائي يصف العلاقة الخطية بين متغير مستقل `x` ومتغير تابع `y`
2. **المكونات:** المعادلة `ŷ = B1x + B0`، حيث `B1` الميل (Slope) و`B0` نقطة التقاطع (Intercept)
3. **مثال:** الخبرة بالسنوات (`x`) والراتب (`y`) — كل سنة خبرة تُضيف 314 ريالاً
4. **متى نستخدم:** عندما يكون لدينا متغير مستقل واحد وعلاقة يمكن تمثيلها بخط مستقيم

---

### سؤال 2: اشرح معادلة B1 بالتفصيل

**نموذج الإجابة:**
1. **التعريف:** `B1 = Σ(xi - x̄)(yi - ȳ) / Σ(xi - x̄)²`
2. **المكونات:** البسط = التغاير المرجّح (covariance numerator)؛ المقام = تباين `x`
3. **مثال:** للرواتب: بسط = 2200، مقام = 17.5، `B1 = 314.29`
4. **متى نستخدم:** لحساب مقدار تأثير `x` على `y`

---

### سؤال 3: ما الفرق بين RSS و MSE؟

**نموذج الإجابة:**
1. **التعريف:** `RSS = Σ(yi - ŷi)²` (إجمالي الخطأ)؛ `MSE = RSS/(n-2)` (متوسط الخطأ)
2. **المكونات:** `RSS` حساس لعدد النقاط؛ `MSE` مُعيَّر ومقارن بين نماذج
3. **مثال:** `RSS = 11428.57`، `MSE = 11428.57/4 = 2857.14` (للرواتب `n=6`)
4. **متى نستخدم:** `MSE` لمقارنة النماذج؛ `RSS` لحساب `stderr`

---

### سؤال 4: ما هو اختبار t وكيف يُطبَّق في الانحدار؟

**نموذج الإجابة:**
1. **التعريف:** اختبار إحصائي يُحدد إذا كان الميل `B1` مختلفاً معنوياً عن الصفر
2. **المكونات:** `H₀: B1=0`؛ `H₁: B1≠0`؛ إحصاءة `t = B1/SE_B1`؛ قرار بناءً على `p-value`
3. **مثال:** `t = 314.29/12.78 = 24.6`، `p = 0.000016 < 0.05` → نرفض `H₀`
4. **متى نستخدم:** دائماً بعد بناء النموذج للتحقق من دلالته الإحصائية

---

### سؤال 5: ما هو Label Encoding ولماذا نحتاجه؟

**نموذج الإجابة:**
1. **التعريف:** تحويل القيم الفئوية النصية إلى أرقام صحيحة
2. **المكونات:** قاموس `mapping`، دالة `.map()`
3. **مثال:** `{'Male':1, 'Female':2}` يحوّل عمود `sex` لأرقام
4. **متى نستخدم:** قبل تطبيق أي خوارزمية `ML` على بيانات تحتوي نصوصاً

---

### سؤال 6: اشرح صيغة OLS للانحدار المتعدد بالمصفوفات

**نموذج الإجابة:**
1. **التعريف:** `B = (XᵀX)⁻¹Xᵀy` — الصيغة المغلقة لإيجاد معاملات الانحدار المتعدد
2. **المكونات:** `X` مصفوفة المتغيرات (مع عمود الواحدات)، `y` متجه الهدف، `B` متجه المعاملات
3. **مثال:** للـ `tips` dataset مع 6 متغيرات + intercept: `B` يحتوي 7 قيم
4. **متى نستخدم:** عند بناء انحدار متعدد بدون `scikit-learn`

---

### سؤال 7: ما الفرق بين sns.lmplot مع hue ومع col؟

**نموذج الإجابة:**
1. **التعريف:** كلاهما يُقسّم البيانات حسب فئة (`sex` مثلاً)، لكن بطريقة مختلفة
2. **المكونات:** `hue` = ألوان مختلفة في نفس المحور؛ `col` = محاور مستقلة (facet grid)
3. **مثال:** `hue='sex'` → خطان ملوّنان في رسم واحد؛ `col='sex'` → لوحتان منفصلتان
4. **متى نستخدم:** `hue` للمقارنة السريعة؛ `col` للوضوح عند كثرة التداخل

---

### سؤال 8: ما وظيفة stats.linregress()؟

**نموذج الإجابة:**
1. **التعريف:** دالة من `scipy.stats` تحسب كل مقاييس الانحدار البسيط دفعة واحدة
2. **المكونات:** ترجع `(slope, intercept, r, p, std_err)` بالترتيب
3. **مثال:** `slope, intercept, r, p, std_err = stats.linregress(df['total_bill'], df['tip'])`
4. **متى نستخدم:** للحصول على كل المقاييس بسطر واحد دون حساب يدوي

---

### سؤال 9: ما معنى الناتج النهائي للانحدار المتعدد على tips dataset؟

**نموذج الإجابة:**
1. **التعريف:** `tip = 0.094×total_bill + 0.034×sex − 0.075×smoker − 0.112×time + 0.0527×day + 0.17×size + 0.714`
2. **المكونات:** كل معامل يعبر عن تأثير متغيره عند ثبات البقية
3. **مثال:** `size+1` يُضيف `0.17$` للإكرامية؛ التدخين يخفضها `0.075$`
4. **متى نستخدم:** للتنبؤ بإكرامية أي طاولة بإدخال قيم المتغيرات

---

### سؤال 10: متى يُفضَّل Multiple بدلاً من Simple Regression؟

**نموذج الإجابة:**
1. **التعريف:** عندما تتأثر الظاهرة بأكثر من عامل واحد
2. **المكونات:** البيانات تحتوي متغيرات متعددة ذات ارتباط بـ`y`
3. **مثال:** الإكرامية تتأثر بالفاتورة والحجم والجنس واليوم — ليس الفاتورة وحدها
4. **متى نستخدم:** عندما يكون `Multiple R²` أعلى بكثير من `Simple R²` (غير مشروحة في المحاضرة)

---

## الجزء السادس: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أعرف معادلة `B1 = Σ(xi-x̄)(yi-ȳ) / Σ(xi-x̄)²` وأطبّقها يدوياً
- [ ] أعرف `B0 = ȳ - B1 × x̄`
- [ ] أستطيع كتابة كود `numpy` يحسب `slope` و`intercept` من الصفر
- [ ] أفهم لماذا `MSE = RSS / (n-2)` وليس `n`
- [ ] أستطيع حساب `t_stat = B1 / stderr` وأفسر `p-value`
- [ ] أعرف الفرق بين `t.sf()` و`t.cdf()` وكيف أحسب `p-value` بهما
- [ ] أستطيع تحويل أعمدة نصية بـ`.map()` وأعرف ترتيب التحويلات
- [ ] أعرف خطوات `Multiple Regression` المصفوفي: `X → Xᵀ → XᵀX → (XᵀX)⁻¹ → B`
- [ ] أعرف لماذا يُضاف عمود `one` ومتى يُرتَّب أولاً
- [ ] أفهم الفرق بين `hue` و`col` في `seaborn lmplot`
- [ ] أستطيع تفسير معاملات نموذج انحدار متعدد (موجب/سالب/حجم)
- [ ] أعرف متى أرفض `H₀` (عند `p < 0.05`)

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| محاضرة 9 (ML) | محاضرات `numpy`/`pandas` | نستخدم `array` و`DataFrame` لبناء النموذج |
| محاضرة 9 (ML) | محاضرات الإحصاء | نستخدم `mean`، `variance`، `t-test`، `p-value` |
| محاضرة 9 (ML) | محاضرات `matplotlib`/`seaborn` | نرسم النتائج بـ`lmplot` و`relplot` |

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| `B1` | `Σ(xi-x̄)(yi-ȳ) / Σ(xi-x̄)²` |
| `B0` | `ȳ - B1 × x̄` |
| `MSE` | `RSS / (n-2)` |
| `t-stat` | `B1 / stderr_slope` |
| `p-value` (ثنائي) | `2 × t.sf(|t|, n-2)` |
| عمود `one` | `B0` في المصفوفات |
| رفض `H₀` | `p < 0.05` |

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `B1` (slope) | تأثير `x` على `y` | معادلة الخط |
| `B0` (intercept) | قيمة `y` عند `x=0` | معادلة الخط |
| `r` | معامل الارتباط (-1 → 1) | `stats.linregress` |
| `RSS` | مجموع مربعات الأخطاء | `np.sum(residuals**2)` |
| `MSE` | متوسط الخطأ | `RSS/(n-2)` |
| `stderr` | خطأ تقدير الميل | `sqrt(MSE/var_x)` |
| `t.sf` | الذيل الأيمن = `1 - CDF` | حساب `p-value` |
| `.map(dict)` | تحويل نص → رقم | `Label Encoding` |
| `.T` | منقولة المصفوفة | `Multiple Regression` |
| `np.linalg.inv` | عكس المصفوفة | `(XᵀX)⁻¹` |
| `.dot()` | ضرب المصفوفات | `Xᵀy`، `B` |

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | دائماً `MSE = RSS / (n-2)` للانحدار البسيط |
| 2 | `p-value` ثنائي = `2 × t.sf(|t|, df)` |
| 3 | عمود `one` يجب أن يكون **أول** عمود في `df3` |
| 4 | حوّل **كل** الأعمدة النصية قبل الانحدار |
| 5 | `r = 0.676` → ارتباط موجب قوي ← نقبل النموذج |
| 6 | `p < 0.05` → نرفض `H₀` → العلاقة دالة |
| 7 | `hue` = ألوان في نفس الرسم؛ `col` = لوحات مستقلة |

---

### السيناريو 1: تحليل كود كامل

> **السيناريو:** اقرأ الكود التالي:
> ```python
> x = np.array([1, 2, 3, 4, 5])
> y = np.array([2, 4, 5, 4, 5])
> n = len(x)
> x_mean = np.mean(x)
> y_mean = np.mean(y)
> slope = np.sum((x - x_mean) * (y - y_mean)) / np.sum((x - x_mean) ** 2)
> intercept = y_mean - slope * x_mean
> y_pred = slope * x + intercept
> residuals = y - y_pred
> rss = np.sum(residuals ** 2)
> mse = rss / (n - 2)
> stderr = np.sqrt(mse / np.sum((x - x_mean)**2))
> t_stat = slope / stderr
> ```

### السؤال 1.1 (hard): ما قيمة `x_mean` و`y_mean`؟
أ) `x_mean = 2.5`, `y_mean = 3.8`
ب) `x_mean = 3.0`, `y_mean = 4.0` ✅
ج) `x_mean = 3.0`, `y_mean = 3.8`
د) `x_mean = 2.5`, `y_mean = 4.0`

**التعليل:** `x̄ = (1+2+3+4+5)/5 = 3.0`؛ `ȳ = (2+4+5+4+5)/5 = 20/5 = 4.0`

### السؤال 1.2 (hard): ما قيمة `rss`؟
أ) `4.0`
ب) `3.8`
ج) `2.8` ✅
د) `1.4`

**التعليل:**
- `slope ≈ 0.6`، `intercept ≈ 2.2`
- `y_pred ≈ [2.8, 3.4, 4.0, 4.6, 5.2]`
- `residuals ≈ [-0.8, 0.6, 1.0, -0.6, -0.2]`
- `rss ≈ 0.64 + 0.36 + 1.0 + 0.36 + 0.04 = 2.4` (تقريباً)

### السؤال 1.3 (hard): ما درجات الحرية `dfree`؟
أ) `5`
ب) `4`
ج) `3` ✅
د) `2`

**التعليل:** `n - 2 = 5 - 2 = 3`

---

### السيناريو 2: انحدار متعدد

> **السيناريو:** عند تطبيق الانحدار المتعدد على `tips` dataset:
> - `df3` شكله `(244 × 7)`
> - الناتج `df5 = array([0.714, 0.094, 0.034, -0.075, -0.112, 0.053, 0.175])`
> - الأعمدة: `[one, total_bill, sex, smoker, time, day, size]`

### السؤال 2.1 (hard): ما قيمة `B0` (intercept)؟
أ) `0.094`
ب) `0.714` ✅
ج) `0.034`
د) `0.175`

**التعليل:** `B0` يقابل عمود `one` — أول قيمة = `0.714`

### السؤال 2.2 (hard): إذا كانت `total_bill=20, sex=1, smoker=0, time=1, day=2, size=2`، ما الإكرامية المتوقعة؟
أ) `3.1$` تقريباً ✅
ب) `2.5$`
ج) `4.2$`
د) `1.8$`

**التعليل:**
`tip = 0.714 + 0.094×20 + 0.034×1 − 0.075×0 − 0.112×1 + 0.053×2 + 0.175×2`
`= 0.714 + 1.88 + 0.034 + 0 − 0.112 + 0.106 + 0.35 = 2.972 ≈ 3.0$`

### السؤال 2.3 (hard): ما شكل مصفوفة `df4 = df3_transposed.dot(df3)`؟
أ) `244 × 244`
ب) `244 × 7`
ج) `7 × 7` ✅
د) `7 × 244`

**التعليل:** `(7×244) × (244×7) = 7×7`

---

### السيناريو 3: تفسير p-value

> **السيناريو:** باحث يدرس العلاقة بين النوم والتركيز. حصل على:
> - `slope = 0.05`, `stderr = 0.03`, `n = 30`
> - حساب: `t_stat = 0.05/0.03 = 1.67`, `dfree = 28`
> - باستخدام جداول t: القيمة الحرجة عند `df=28` و`α=0.05` هي `2.048`

### السؤال 3.1 (hard): ما الاستنتاج الصحيح؟
أ) نرفض `H₀` — النوم يؤثر على التركيز
ب) لا نرفض `H₀` — لا دليل كافٍ على تأثير النوم ✅
ج) العلاقة سالبة
د) يجب إعادة الدراسة

**التعليل:** `|t_stat| = 1.67 < 2.048` (القيمة الحرجة) → لا نرفض `H₀`

### السؤال 3.2 (hard): ما العلاقة بين t_stat والقيمة الحرجة والقرار؟
أ) `|t| > حرجة → نقبل H₀`
ب) `|t| > حرجة → نرفض H₀` ✅
ج) `|t| < حرجة → نرفض H₀`
د) لا علاقة بين الاثنين

**التعليل:** نرفض `H₀` إذا كانت `|t_stat|` أكبر من القيمة الحرجة عند مستوى الدلالة المختار

---

<!-- VALIDATION
schema: 1.0
parts: integration_map, detailed_explanation, summary, mcq, debug, exercise, analysis_exercise, trace_exercise, design_question, qa_cards, theory, self_check, cheat_sheet
mcq_count: 16
code_blocks: 15
-->
