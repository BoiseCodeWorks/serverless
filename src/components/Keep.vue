<template>
  <div class="keep">
    <div class="card p-1">
      <div class="card-img">
        <img :src="keep.img" class="responsive-img">
      </div>
      <div class="card-content">
        <div class="card-title">
          <div class="flex align-items-center space-between">
            <span>{{keep.title}}</span>
            <span>
              <i class="fa fa-fw fa-eye"></i>
              <span>{{keep.views}}</span>
            </span>
          </div>
        </div>
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['keep']
  }
</script>