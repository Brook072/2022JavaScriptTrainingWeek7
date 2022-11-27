module.exports = {
  content: ["./app/**/*.{html,ejs,js}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.75rem',
      },
      screens: {
        md: '768px',
        lg: '992px',
        xl: '1120px',
      },
      fontSize: {
        'arrow':['4px','4px'],
        '4xl': ['32px', '43px'],
      }
    },
    extend: {
      backgroundImage: {
        'createAreaImage': "url('https://brook072.github.io/2022JavaScriptTrainingWeek6/assets/images/main_img.png')",
        'createAreaSlogan': "url('https://brook072.github.io/2022JavaScriptTrainingWeek6/assets/images/logo.png')",
      },
      colors:{
        'primary':'#00807E',
        'secondary':'#FAFAFA',
        'tertiary':'#818A91',
        'seaSerpent': '#64C3BF',
        'lightGray':'#CED4DA',
        'red': '#FF0000'
      },
      spacing:{
        '0.75':'3px',
        '3.75':'0.9325rem',
        '7.5':'1.875rem',
        '9.5':'2.375rem',
        '15':'4.25rem',
        '25':'6.25rem',
        '30':'7.5rem',
        '36':'9rem',
        '45':'11.25rem',
        '59':'14.75rem',
        '62':'15.5rem',
        '87':'21.75rem',
      },
      maxWidth: {
        '64': '16rem',
        '87.5':'21.875rem',
        '230': '57.5rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}