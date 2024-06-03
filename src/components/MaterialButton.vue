<template>
    <button
        class="btn mb-0"
        :class="getClasses(variant, color, size, fullWidht, active)"
    >
    <slot />
    </button>
</template>
<script>
export default{
    name: "MaterialButton",
    props: {
        color: {
            type: String,
            default: "success",
        },
        size:{
            type: String,
            default: "md",
        },
        variant:{
            type: String,
            default: "fill",
        },
        fullWidht:{
            type: Boolean,
            default: false,
        },
        active:{
            type: Boolean,
            default: true,
        },
    },
    methods:{
        getClasses: (variant, color, size, fullWidht, active) => {
            let colorValue, sizeValue, fullWidhtValue, activeValue;
            if (variant === "gradient"){
                colorValue = `bg-gradient-${color}`;
            }else if (variant === "outline"){
                colorValue = `btn-outline-${color}`;
            }else{
                colorValue = `btn-${color}`;
            }
            sizeValue = size ? `btn-${size}` : null;
            fullWidhtValue = fullWidht ? `w-100` :null;
            activeValue = active ? `active`:null;

            return `${colorValue} ${sizeValue} ${fullWidhtValue} ${activeValue}`
        }
    }
};
</script>