const WITH_PHOTO = 'with-photo'
const WITHOUT_PHOTO = 'without-photo'

export default [
  {
    value: '',
    text: 'Reset',
    filterCondition: () => true,
  },
  {
    value: WITH_PHOTO,
    text: 'With photo',
    filterCondition: (product) => product.photo,
  },
  {
    value: WITHOUT_PHOTO,
    text: 'Without photo',
    filterCondition: (product) => !product.photo,
  },
]
