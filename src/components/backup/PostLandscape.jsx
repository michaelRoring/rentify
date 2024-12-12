import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PostLandscape = ({id, title, content, date, category, image, slug, imageRight}) => {
  return (
    <div className="grid md:grid-cols-2 gap-[20px] md:gap-[40px]">
      <Image 
        className={imageRight ? 'md:order-1' : 'md:order-0'} 
        src={image} 
        alt={title} 
        width={600} 
        height={400} 
        priority
      />
      <div className={`flex flex-col gap-[10px] ${imageRight ? 'md:order-0' : 'md:order-1'}`}>
        <div className="font-[700] text-[22px] tracking-tight">{title}</div>
        <div className="text-[14px] text-slate-500">{category} | {moment(date).format('YYYY, DD MMMM')}</div>
        <div>{content.substr(0, 70)}...</div>
        <Link href={`/post/${slug}`} className="text-blue-500">Read more...</Link>
      </div>
  </div>
  );
}

export default PostLandscape;
