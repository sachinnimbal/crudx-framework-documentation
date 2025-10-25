import { motion } from "framer-motion";
import {
  BoltIcon,
  ShieldCheckIcon,
  CodeBracketSquareIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CircleStackIcon,
  ChartBarIcon,
  RectangleStackIcon,
  LockClosedIcon,
  ListBulletIcon,
  ArrowPathIcon,
  CpuChipIcon,
  ExclamationTriangleIcon,
  BanknotesIcon,
  GlobeAltIcon,
  BookOpenIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Alert from "../components/Alert";
import Breadcrumbs from "../components/Breadcrumbs";
import Pagination from "../components/Pagination";
import TOC from "../components/TOC";
import overviewData from "../data/overview.json";
import CodeBlock from "../components/CodeBlock";

// Map icon names to actual Heroicon components
const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  BoltIcon,
  ShieldCheckIcon,
  CodeBracketSquareIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CircleStackIcon,
  ChartBarIcon,
  RectangleStackIcon,
  LockClosedIcon,
  ListBulletIcon,
  ArrowPathIcon,
  CpuChipIcon,
  ExclamationTriangleIcon,
  BanknotesIcon,
  GlobeAltIcon,
  BookOpenIcon,
};

export default function Overview() {
  const {
    breadcrumbs,
    version,
    hero,
    features,
    quickExample,
    nextSteps,
    pagination,
    toc,
  } = overviewData;

  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <section id="overview">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Badge variant="info" className="mb-4">
              Current {version}
            </Badge>
            <h1 className="hero-title mb-4">
              {hero.title}{" "}
              <span className="gradient-text">{hero.highlight}</span>
            </h1>
            <p className="hero-subtitle max-w-3xl">{hero.subtitle}</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/getting-started"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 focus-ring transition-opacity"
              >
                {hero.buttons.getStarted}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent focus-ring transition-colors"
              >
                {hero.buttons.viewOnGithub}
              </a>
            </div>
          </motion.div>
        </section>
        {/* Key Features */}
        <section id="key-features" className="mb-12">
          <h2 className="text-[clamp(1.5rem,3vw+0.5rem,2.25rem)] font-semibold tracking-tight mb-6">
            {features.title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.items.map((item, idx) => {
              const Icon = iconMap[item.icon];
              return (
                <Card key={idx} hover>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Quick Example */}
        <section id="quick-example" className="prose mb-12">
          <h2>{quickExample.title}</h2>
          <p>{quickExample.intro}</p>
          <div className="not-prose">
            <CodeBlock
              code={`
                package com.crudx.examples.controller;

import io.github.sachinnimbal.crudx.core.dto.annotations.CrudXField;
import io.github.sachinnimbal.crudx.core.dto.annotations.CrudXRequest;
import io.github.sachinnimbal.crudx.core.dto.annotations.CrudXResponse;
import io.github.sachinnimbal.crudx.core.model.CrudXMongoEntity;
import io.github.sachinnimbal.crudx.web.CrudXController;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.github.sachinnimbal.crudx.core.enums.CrudXOperation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController extends CrudXController<StudentController.Student, String> {
    @Document("students")
    @Data
    public static class Student extends CrudXMongoEntity<String> {
        private String studentId, firstName, lastName, email, department;
        private Double gpa;
    }

    @Data
    @CrudXRequest(value = Student.class, operations = {CREATE, UPDATE})
    public static class StudentRequest {
        @CrudXField(required = true)
        private String firstName, lastName, email, department;
        private Double gpa;
    }

    @Data
    @CrudXResponse(value = Student.class, operations = {GET_ID, GET_ALL})
    public static class StudentResponse {
        private String studentId, firstName, lastName, email, department;
        private Double gpa;
    }
}
   `}
             language="java"
             showLineNumbers={false}
            />
          </div>
          <Alert title={quickExample.alert.title} className="my-6">
            {quickExample.alert.text}
          </Alert>
        </section>

        {/* Next Steps */}
        <section id="next-steps" className="prose mb-12">
          <h2>{nextSteps.title}</h2>
          <p>{nextSteps.intro}</p>
          <ul>
            {nextSteps.links.map((link, idx) => (
              <li key={idx}>
                <Link to={link.path}>{link.label}</Link> - {link.desc}
              </li>
            ))}
          </ul>
        </section>

        <Pagination next={pagination.next} />
      </div>

      {/* Right Sidebar - TOC */}
      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <TOC items={toc} />
        </div>
      </aside>
    </div>
  );
}
